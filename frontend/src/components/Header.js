//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/logo.jpg'

const StyledHeader = styled.div`
	padding: 0.5vh 1vw;
	display: flex;
	align-items: center;
	border-bottom: 0.5vh solid black;
`

const Logo = styled.img`
 	height: 6vh;
	aspectRatio: 603 / 212;
`

const Type = styled.div`
	letter-spacing: 0.3vw;
	margin-right: 2vw;
	padding: 0.2vh 0.3vw 0.2vh 0.5vw;
	color: white;
	font-size: 1.6vh;
	font-weight: 500;
	font-family: Microsoft YaHei;
	text-align: center;
	border-radius: 15px;
	background-color: #00808C;
	box-shadow: 3px 3px 1px black;
	cursor: pointer;
`

function Header(props) {
	return (
		<StyledHeader>
			<Logo src={logo}/>
			<div style={{'margin-left': '20vw', 'display': 'flex', 'flex-direction': 'row'}}>
				<Type onClick={() => props.setType('拉麵')}>拉麵</Type>
				<Type onClick={() => props.setType('火鍋')}>火鍋</Type>
				<Type onClick={() => props.setType('咖啡廳')}>咖啡廳</Type>
				<Type onClick={() => props.setType('飲料')}>飲料</Type>
			</div>
		</StyledHeader>
	);
}

export default Header;
