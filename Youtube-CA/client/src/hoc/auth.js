import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { auth } from '../_actions/user_action';
export default function(SpecificComponent, option, adminRoute = null){
		
		function AuthenticateCheck(props){
			
			const dispatch = useDispatch();
			
			useEffect(()=> {
				dispatch(auth())
				.then((response) => {
					//만약 로그인이 안되어있을 경우
					if(!response.payload.isAuth){
						// 페이지의 option이 true이면, 로그인 페이지로 보내겠다...(즉, 로그인 안되있는 경우만 해야할 때)
						if(option){
							props.history.push('/login')
						}
					} else{
						//만약 로그인 한 경우
						//이 사람이 관리자 페이지에 접속했으나, 관리자 권한은 없는 경우
						if(adminRoute && !response.payload.isAdmin){
							props.history.push('/')
							//이게 아닌 다른 모든 경우에
						} else {
							//로그인 한 유저가 option이 false, 즉 로그인 안하면 못들어가는 곳에 들어가면...
							if(option === false){
								props.history.push('/')
							}
						}
					}
				})
			},[])
			
			// 그 이외에는 그냥 내보내준다.
			return(
				<SpecificComponent />
			)
		}
		return withRouter(AuthenticateCheck);
	}
	