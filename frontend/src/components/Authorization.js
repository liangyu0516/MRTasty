import axios from "axios";
import React, { Component } from "react";  
import Swal from "sweetalert2";  
	
export default class Authorization extends Component {  
	constructor() {  
		super();  
		this.HandleClick = this.HandleClick.bind(this);  
	}  
	
	HandleClick() {} 
	HandleClickSignUp() { 
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
			axios.post("http://localhost:3100/api/v1/user/signup", result.value)
			.then(function(response) {
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
		Swal.fire({
			title: '登入',
			html: `
				Username <input type="text" id="username" class="swal2-input" placeholder="Username">
				Password <input type="password" id="password" class="swal2-input" placeholder="Password">`,
			confirmButtonText: '確認',
			focusConfirm: false,
			preConfirm: () => {
			  const username = Swal.getPopup().querySelector('#username').value
			  const password = Swal.getPopup().querySelector('#password').value
			  if (!username || !password) {
				Swal.showValidationMessage(`Please enter login and password`)
			  }
			  return { username: username, password: password }
			}
		})
		.then((result) => {
			if(result.dismiss === "backdrop") {
				return
			}
			axios.post("http://localhost:3100/api/v1/user/signup", result.value)
			.then(function(response) {
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
					<button class="btn btn-info btn" onClick={this.HandleClickSignUp}>Sign Up</button>  
					<button class="btn btn-success btn" onClick={this.HandleClickSignIn}>Sign In</button>
				</div>  
			</div>  
		);  
	}  
} 