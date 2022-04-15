const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5,
	},
	lastname: {
		type: String,
		maxlength: 50,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});
//데이터 베이스에 저장하기 전 실행함(미들웨어)
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
	bcrypt.compare(plainPassword, this.password, function(err, isMatch){
		if(err) {return cb(err)}
		return cb(null, isMatch)
	})
}
//compare method는 콜백함수에 err혹은 결과 값(true or false)를 내놓는다.
//즉, cb(null, isMatch)시, true를 내놓기에 isMatch는 true가된다.


userSchema.methods.generateToken = function (cb) {
    var user = this;
    // console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err){return cb(err)}
        else(cb(null, user))
    })
}
//mongoose에서 콜백함수는 err를 리턴하고 싶다면, err만 넣으면 되고, 에러발생이 아닐 시, user객체를 넣게 된다.
userSchema.statics.findByToken = function(token, cb){
	var user = this;
	
	//콜백함수가 리턴되어 실행되는데, err또는 decoded된 값을 내놓는다.
	jwt.verify(token,'secretToken',function(err,decoded){
		
		//유저 아이디를 이용해 유저를 찾은 다음에
		//클라이언트에서 가져온 token과 DB에서 보관
		user.findOne({"_id": decoded, "token": token}, function(err, user) {
			if(err) return cb(err);
			cb(null, user);
		})
		
	})
}

const User = mongoose.model('User', userSchema);

module.exports = { User };
//다른 곳에서도 사용가능

//권한은 숫자로 구분

//type하나만 지정하는 경우 굳이 객체로 안만들어도 된다.