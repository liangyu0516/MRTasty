//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/logo.jpg'
import ramen from '../images/ramen.png'
import hotpot from '../images/hotpot.png'
import coffee from '../images/coffee.png'
import drink from '../images/drink.png'
import profile from '../images/profile.png'
import Authorization from './Authorization'
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
	padding: 1vh 2vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 0.5vh solid black;
`

const Logo = styled.img`
 	height: 8vh;
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
	border: ${props => props.isSelected ? '0':'1px'} solid black;
	border-radius: 10px;
	background-color: ${props => props.isSelected ? '#00808C':'white'};
	box-shadow: 3px 3px 1px black;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	:active {
		box-shadow: 0px 0px 1px black;
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
	width: 2.5vw;
	height: 2.5vw;
`

function Header(props) {
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
				<Link to="/profile" style={{ 'color': 'black', 'textDecoration': 'none' }}>
					<div style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}}>
						<ProfileName>{window.localStorage.getItem('username')}</ProfileName>
						<ProfileImg src={profile} />
					</div>
				</Link>
			</StyledHeader>
		);
	}
}

export default Header;
