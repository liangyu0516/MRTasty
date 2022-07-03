//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/logo.jpg'
import ramen from '../images/ramen.png'
import hotpot from '../images/hotpot.png'
import coffee from '../images/coffee.png'
import drink from '../images/drink.png'
import profile from '../images/profile.png'
import Authorization from './Authorization'
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
	padding: 1vh 2vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 0.1vh solid black;
`

const Logo = styled.img`
 	height: 7vh;
	aspectRatio: 603 / 212;
`

const Type = styled.div`
	letter-spacing: 0.3vw;
	margin-right: 2vw;
	padding: 0.8vh 0.6vw 0.8vh 0.8vw;
	color: ${props => props.isSelected ? 'white':'#00808C'};
	font-size: 1.2vw;
	font-weight: 500;
	font-family: Microsoft YaHei;
	text-align: center;
	border: ${props => props.isSelected ? '0':'1px'} solid white;
	border-radius: 7px;
	box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
	background-color: ${props => props.isSelected ? '#00808C':'white'};
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	:active {
		box-shadow: 0px 3px 1px black;
		border: 1px solid black;
	}
`

const TypeImg = styled.img`
	width: 2vw;
	height: 2vw;
	margin-right: 0.3vw;
`

const ProfileName = styled.div`
	margin-right: 1vw;
	font-size: 1.2vw;
	font-weight: 600;
`

const ProfileImg = styled.img`
	margin-right: 1vw;
	width: 2.5vw;
	height: 2.5vw;
`

const Button = styled.button`
	padding: 0.7vw 1.2vw;
	font-size: 1.2vw;
	font-weight: 600;
	letter-spacing: 0.1vw;
	color: white;
	background-color: #00808C;
	border: 0 solid black;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	cursor: pointer;
	:hover {
		background-color: #00B2C2;
	}
	:active {
		color: #00808C;
		background-color: white;
	}
`

function Header(props) {
	function handleClickSignOut() {
		props.setToken()
		Cookies.remove('access_token')
		window.localStorage.clear()
		Swal.fire({  
			icon: 'success',  
			title: '登出成功 :D',  
			text: '歡迎下次再來',
			showConfirmButton: false,  
			timer: 2000 
		});
	}

	if(props.token == null) {
		return (
			<StyledHeader>
				<Link to="/">
					<Logo src={logo}/>
				</Link>
				<div style={{'display': 'flex', 'flex-direction': 'row'}}>
					<Type isSelected={props.type === '拉麵' ? true:false} onClick={() => props.setType('拉麵')} ><TypeImg src={ramen} />拉麵</Type>
					<Type isSelected={props.type === '火鍋' ? true:false} onClick={() => props.setType('火鍋')}><TypeImg src={hotpot} />火鍋</Type>
					<Type isSelected={props.type === '咖啡廳' ? true:false} onClick={() => props.setType('咖啡廳')}><TypeImg src={coffee} />咖啡廳</Type>
					<Type isSelected={props.type === '飲料' ? true:false} onClick={() => props.setType('飲料')}><TypeImg src={drink} />飲料</Type>
				</div>
				<Authorization token={props.token} setToken={props.setToken}/>
			</StyledHeader>
		);
	}
	else {
		return (
			<StyledHeader>
				<Link to="/">
					<Logo src={logo}/>
				</Link>
				<div style={{'display': 'flex', 'flex-direction': 'row'}}>
					<Type isSelected={props.type === '拉麵' ? true:false} onClick={() => props.setType('拉麵')} ><TypeImg src={ramen} />拉麵</Type>
					<Type isSelected={props.type === '火鍋' ? true:false} onClick={() => props.setType('火鍋')}><TypeImg src={hotpot} />火鍋</Type>
					<Type isSelected={props.type === '咖啡廳' ? true:false} onClick={() => props.setType('咖啡廳')}><TypeImg src={coffee} />咖啡廳</Type>
					<Type isSelected={props.type === '飲料' ? true:false} onClick={() => props.setType('飲料')}><TypeImg src={drink} />飲料</Type>
				</div>
				<div style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}}>
					<Link to="/profile" style={{ 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'color': 'black', 'textDecoration': 'none' }}>
						<ProfileName>{window.localStorage.getItem('username')}</ProfileName>
						<ProfileImg src={profile} />
					</Link>
					<Button onClick={handleClickSignOut}>登出</Button>
				</div>
			</StyledHeader>
		);
	}
}

export default Header;
