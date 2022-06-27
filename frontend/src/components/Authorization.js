import axios from "axios";
import React, { Component } from "react";  
import Swal from "sweetalert2";
import cookies from "js-cookies";
	
export default class Authorization extends Component {
	constructor(props) {  
		super();
		this.token = props.token
		this.setToken = props.setToken
		this.HandleClick = this.HandleClick.bind(this);
		this.HandleClickSignUp = this.HandleClickSignUp.bind(this.setToken);
		this.HandleClickSignIn = this.HandleClickSignIn.bind(this.setToken);
	}  
	
	HandleClick() {} 
	HandleClickSignUp(setToken) { 
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

			axios.post("http://localhost:3100/api/v1/user/signup", result.value, {withCredentials: true, credentials: 'include'})
			.then(function(response) {
				cookies.setItem('access_token', response.data.access_token)
				setToken(cookies.getItem('access_token'))
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
	HandleClickSignIn(setToken) {
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
				cookies.setItem('access_token', response.data.access_token)
				setToken(cookies.getItem('access_token'))
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
	HandleClick12() {  
		Swal.fire({  
			icon: 'error',  
			title: 'Oops...',  
			text: 'Something went wrong!',  
			footer: '<a href>Why do I have this issue?</a>'  
		});  
	}  
	HandleClicktop() {  
		Swal.fire({  
			position: 'top-end',  
			icon: 'success',  
			title: 'Your work has been saved',  
			showConfirmButton: false,  
			timer: 1500  
		});  
	}
	
	render() {  
		return (  
			<div>
				<div style={{ "paddingTop": "10px" }}>  
					<button class="btn btn-info btn" onClick={this.HandleClickSignUp(this.setToken)}>Sign Up</button>  
					<button class="btn btn-success btn" onClick={this.HandleClickSignIn(this.setToken)}>Sign In</button>
				</div>  
			</div>  
		);  
	}  
} 