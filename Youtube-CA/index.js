const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { User } = require('./models/Users');
const config = require('./config/key');


//application/x-www-form-urlencoded
app.use(express.json());
//application/json
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
	useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));


app.get('/',(req,res) => res.send("Hello World!~~ 안녕하세요~!"));

app.post('/register',(req,res) => {
	//회원 가입 시 필요한 정보들을 client에서 가져옴
	//그것들을 데이터베이스에 넣는다.
	const user = new User(req.body);
	
	//mongoDB에서 오는 메소드
	user.save((err, userInfo) => {
		if(err) return res.json({success: false, err});
		return res.status(200).json({
			success: true
		})
	})
})

app.listen(port, ()=> console.log(`Example app is listening on port ${port}!`));
