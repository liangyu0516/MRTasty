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
			title: '???????????? :D',  
			text: '??????????????????',
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
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')} ><TypeImg src={ramen} />??????</Type>
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')}><TypeImg src={hotpot} />??????</Type>
					<Type isSelected={props.type === '?????????' ? true:false} onClick={() => props.setType('?????????')}><TypeImg src={coffee} />?????????</Type>
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')}><TypeImg src={drink} />??????</Type>
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
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')} ><TypeImg src={ramen} />??????</Type>
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')}><TypeImg src={hotpot} />??????</Type>
					<Type isSelected={props.type === '?????????' ? true:false} onClick={() => props.setType('?????????')}><TypeImg src={coffee} />?????????</Type>
					<Type isSelected={props.type === '??????' ? true:false} onClick={() => props.setType('??????')}><TypeImg src={drink} />??????</Type>
				</div>
				<div style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}}>
					<Link to="/profile" style={{ 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'color': 'black', 'textDecoration': 'none' }}>
						<ProfileName>{window.localStorage.getItem('username')}</ProfileName>
						<ProfileImg src={profile} />
					</Link>
					<Button onClick={handleClickSignOut}>??????</Button>
				</div>
			</StyledHeader>
		);
	}
}

export default Header;
