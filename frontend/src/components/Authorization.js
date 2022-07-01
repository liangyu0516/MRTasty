import axios from "axios";
import React, { Component } from "react"; 
import styled from 'styled-components'
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Button = styled.button`
	padding: 0.7vw 1.2vw;
	font-size: 1.2vw;
	font-weight: 600;
	letter-spacing: 0.1vw;
	color: white;
	background-color: #00808C;
	border: 2px solid black;
	border-radius: 10px;
	box-shadow: 0px 3px 1px black;
	cursor: pointer;
	:hover {
		background-color: #00B2C2;
	}
	:active {
		box-shadow: 0px 0px 1px black;
	}
`
	
export default class Authorization extends Component {
	constructor(props) {  
		super(props);
		this.token = props.token
		this.setToken = props.setToken
		this.HandleClick = this.HandleClick.bind(this);
		this.HandleClickSignUp = this.HandleClickSignUp.bind(this);
		this.HandleClickSignIn = this.HandleClickSignIn.bind(this);
	}  
	
	HandleClick() {} 
	HandleClickSignUp() {
		const setToken = this.setToken
		Swal.fire({
			title: '註冊',
			html: `
				E-mail <input type="email" id="email" class="swal2-input" placeholder="E-mail">
				Username <input type="text" id="username" class="swal2-input" placeholder="Username">
				Password <input type="password" id="password" class="swal2-input" placeholder="Password">`,
			confirmButtonText: '確認',
			focusConfirm: false,
			preConfirm: () => {
			  const email = Swal.getPopup().querySelector('#email').value
			  const username = Swal.getPopup().querySelector('#username').value
			  const password = Swal.getPopup().querySelector('#password').value
			  if (!email || !username || !password) {
				Swal.showValidationMessage(`Please enter e-mail, login and password`)
			  }
			  return { email: email, username: username, password: password }
			}
		})
		.then((result) => {
			if(result.dismiss === "backdrop") return;

			axios.post("http://localhost:3100/api/v1/user/signup", result.value)
			.then(function(response) {
				Cookies.set('access_token', response.data.access_token)
				setToken(Cookies.get('access_token'))
				window.localStorage.setItem('username', response.data.username)
				if(response.status === 200) {
					Swal.fire({  
						position: 'top-end',  
						icon: 'success',  
						title: '歡迎來到 MRTasty :>',  
						showConfirmButton: false,  
						timer: 2000
					}); 
				}
			})
			.catch((error) => {
				Swal.fire({  
					position: 'top-end',
					icon: 'error',  
					title: '註冊失敗 :<',  
					text: '這個信箱已經使用過了',
					confirmButtonText: '好的'  
				});
			})
		})		  
	}
	HandleClickSignIn() {
		const setToken = this.setToken
		Swal.fire({
			title: '登入',
			html: `
				E-mail <input type="email" id="email" class="swal2-input" placeholder="E-mail">
				Password <input type="password" id="password" class="swal2-input" placeholder="Password">`,
			confirmButtonText: '確認',
			focusConfirm: false,
			preConfirm: () => {
			  const email = Swal.getPopup().querySelector('#email').value
			  const password = Swal.getPopup().querySelector('#password').value
			  if (!email || !password) {
				Swal.showValidationMessage(`Please enter login and password`)
			  }
			  return { email: email, password: password }
			}
		})
		.then((result) => {
			if(result.dismiss === "backdrop") return;
			
			axios.post("http://localhost:3100/api/v1/user/signin", result.value)
			.then(function(response) {
				Cookies.set('access_token', response.data.access_token, { expires: 1 / 8 })
				setToken(Cookies.get('access_token'))
				window.localStorage.setItem('username', response.data.username)
				if(response.status === 200) {
					Swal.fire({  
						position: 'top-end',  
						icon: 'success',  
						title: '登入成功',  
						showConfirmButton: false,  
						timer: 2000
					}); 
				}
			})
			.catch((error) => {
				Swal.fire({  
					position: 'top-end',
					icon: 'error',  
					title: '登入失敗 :<',  
					text: error.response?.data.error ?? error,
					confirmButtonText: '好的'  
				});
			})
		})  
	}  
	
	render() {
		return (  
			<div style={{'display': 'flex', 'flex-direction': 'row', 'justify-content': 'space-between', 'width': '12vw'}}>
				<Button class="btn btn-info btn" onClick={this.HandleClickSignUp}>註冊</Button>  
				<Button class="btn btn-success btn" onClick={this.HandleClickSignIn}>登入</Button>
			</div>  
		);  
	}  
} 