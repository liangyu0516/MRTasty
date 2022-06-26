//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/logo.jpg'
import ramen from '../images/ramen.png'
import Authorization from './Authorization'

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
	color: white;
	font-size: 1.2vw;
	font-weight: 500;
	font-family: Microsoft YaHei;
	text-align: center;
	border-radius: 10px;
	background-color: #00808C;
	box-shadow: 3px 3px 1px black;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const TypeImg = styled.img`
	width: 2vw;
	height: 2vw;
	margin-right: 0.3vw;
`

function Header(props) {
	return (
		<StyledHeader>
			<Logo src={logo}/>
			<div style={{'display': 'flex', 'flex-direction': 'row'}}>
				<Type onClick={() => props.setType('拉麵')} ><TypeImg src={ramen} />拉麵</Type>
				<Type onClick={() => props.setType('火鍋')}>火鍋</Type>
				<Type onClick={() => props.setType('咖啡廳')}>咖啡廳</Type>
				<Type onClick={() => props.setType('飲料')}>飲料</Type>
			</div>
			<Authorization />
		</StyledHeader>
	);
}

export default Header;
