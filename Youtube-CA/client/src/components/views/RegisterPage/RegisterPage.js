import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';


function RegisterPage(props){
	const dispatch = useDispatch();
	
		const [Email, setEmail] = useState("");
		const [Password, setPassword] = useState("");
		const [Name, setName] = useState("");
		const [ConfirmPassword, setConfirmPassword] = useState("");
	
	
		const onEmailHandler = (e) => {
			setEmail(e.target.value);
		}
		
		const onPasswordHandler = (e) => {
			setPassword(e.target.value);
		}
		
		const onNameHandler = (e) => {
			setName(e.target.value);
		}
		
		const onConfirmHandler = (e) => {
			setConfirmPassword(e.target.value);
		}
		
		const onSubmitHandler = (e) => {
			e.preventDefault();
			console.log('Email:', Email);
			console.log('Password: ', Password);
			
			let body = {
				email: Email,
				password: Password,
				name: Name
			}
			if(Password !== ConfirmPassword){
				return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
			}
			dispatch(registerUser(body))
				.then((response) => {
					if(response.payload.success){
						props.history.push('/login');
					} else{
						alert('Failed to sign up');
					}
				})
			//즉, 액션 객체 생성함수안에 axios가 있는 셈.. 
			
		}
		return(
			<div style={{
					display: 'flex', justifyContent: 'center', alignItems: 'center'
					, width: '100%', height: '100vh'
				}}>
				<form style={{
						display: "flex", flexDirection: "column"
					}} onSubmit={onSubmitHandler}>
					<label>Email</label>
					<input type="email" value={Email} onChange={onEmailHandler} />
					<label>Name</label>
					<input type="text" value={Name} onChange={onNameHandler} />
					<label>Password</label>
					<input type="password" value={Password} onChange={onPasswordHandler} />
					<label>Confirm Password</label>
					<input type="password" value={ConfirmPassword} onChange={onConfirmHandler} />
					<br />
					<button>
					회원 가입
					</button>
				</form>
			</div>
		)
};

export default withRouter(RegisterPage);