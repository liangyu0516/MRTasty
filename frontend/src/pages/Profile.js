/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import styled from 'styled-components'
import profileImg from '../images/profile.png'
import star from '../images/star.png'
import pencil from '../images/pencil.png'
const axios = require('axios');

const Title = styled.div`
	font-size: 3vw;
	margin-bottom: 3vh;
	letter-spacing: 0.5vw;
`

const StyledProfile = styled.div`
	height: 25vh;
	margin-bottom: 5vh;
	padding: 1vw 5vw;
	text-align: left;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: rgb(245, 250, 250);
	display: flex;
	flex-direction: row;
	align-items: center;
`

const ProfileImg = styled.img`
	width: 10vw;
	height: 10vw;
	margin-right: 5vw;
`

const ProfileInfo = styled.div`
	height: 10vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const Info = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const InfoTitle = styled.div`
	width: 3vw;
	margin-right: 2vw;
	padding: 1.2vh 1vw;
	text-align: center;
	font-weight: 600;
	color: white;
	background-color: rgb(26, 51, 51);
	border-radius: 5px;
`

const Collects = styled.div`
	padding: 0vh 1vw 3vh 3vw;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

const Collect = styled.div`
	width: 17.2vw;
	height: 25vh;
	margin: 0 2vw 3vh 0;
	padding: 3vh 1.1vw;
	background-color: rgb(245, 250, 250);
	border-radius: 5px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const CollectInfo = styled.div`

	font-weight: 600;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const CollectTitle = styled.div`
	width: 2vw;
	margin-right: 2vw;
	padding: 1.2vh 1vw;
	text-align: center;
	font-size: 1vw;
	color: white;
	background-color: rgb(26, 51, 51);
	border-radius: 5px;
`

const CollectTitleIcon = styled.img`
	width: 1.5vw;
	height: 1.5vw;
`

const CollectContent = styled.div`
	width: 11vw;
	text-align: left;
`

function Profile(props) {
	const [profile, setProfile] = useState()
	const [collects, setCollects] = useState()

	useEffect(() => {
		axios.get("http://184.169.138.82:3100/api/v1/user/profile", {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response) {
				console.log(response)
				setProfile(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
		axios.get("http://184.169.138.82:3100/api/v1/collect", {
			headers: { Authorization: `Bearer ` + props.token }
		})
		.then(function(response) {
			console.log(response)
			setCollects(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [])
	return (
		<div style={{'padding': '5vh 15vw', 'font-family': 'Microsoft YaHei', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
			<Title>會員資料</Title>
			<StyledProfile>
				<ProfileImg src={profileImg}/>
				<ProfileInfo>
					<Info>
						<InfoTitle>ID</InfoTitle>
						<div>{profile?.Uid}</div>
					</Info>
					<Info>
						<InfoTitle>信箱</InfoTitle>
						<div>{profile?.Email}</div>
					</Info>
					<Info>
						<InfoTitle>名稱</InfoTitle>
						<div>{profile?.Username}</div>
					</Info>
				</ProfileInfo>
			</StyledProfile>
			<Title>我的收藏</Title>
			<Collects>
				{collects?.map((collect) => (
					<Link to={'/restaurant/' + collect.Place_id} style={{ textDecoration: 'none', color: 'black' }}>
						<Collect>
							<CollectInfo>
								<CollectTitle style={{ 'background-color': '#336666', 'word-break': 'break-all'}}>店名</CollectTitle>
								<CollectContent>{collect.Name}</CollectContent>
							</CollectInfo>
							<CollectInfo>
								<CollectTitle style={{ 'background-color': '#4F9D9D'}}>類別</CollectTitle>
								<div>{collect.Type}</div>
							</CollectInfo>
							<CollectInfo>
								<CollectTitle style={{'padding': '0.5vh 1vw', 'background-color': '#81C0C0'}}><CollectTitleIcon src={star}/></CollectTitle>
								<div>{collect.Rating}</div>
							</CollectInfo>
							<CollectInfo>
								<CollectTitle style={{'padding': '0.5vh 1vw', 'background-color': '#B3D9D9'}}><CollectTitleIcon src={pencil}/></CollectTitle>
								<div>{collect.Total_ratings}</div>
							</CollectInfo>
						</Collect>
					</Link>
				))}
			</Collects>
		</div>
	);
}

export default Profile;