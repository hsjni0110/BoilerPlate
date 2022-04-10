const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1
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
	}
})

const User = mongoose.model('User',userSchema);

module.exports = { User };
//다른 곳에서도 사용가능


//권한은 숫자로 구분

//type하나만 지정하는 경우 굳이 객체로 안만들어도 된다.
