/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import profileImg from '../images/profile.png'
const axios = require('axios');

const StyledProfile = styled.div`
	height: 25vh;
	margin-left: 3vw;
	padding: 1vw 5vw;
	text-align: left;
	border: 2px solid black;
	border-radius: 15px;
	box-shadow: 10px 10px 3px black;
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

function Profile(props) {
	const [profile, setProfile] = useState()
	const [collect, setCollect] = useState()

	useEffect(() => {
		axios.get("http://localhost:3100/api/v1/user/profile", {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response) {
				console.log(response)
				setProfile(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
		axios.get("http://localhost:3100/api/v1/collect", {
			headers: { Authorization: `Bearer ` + props.token }
		})
		.then(function(response) {
			console.log(response)
			setCollect(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [])
	return (
		<div style={{'padding': '5vh 15vw', 'font-family': 'Microsoft YaHei', 'background-color': 'rgb(231, 243, 243)'}}>
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
		</div>
	);
}

export default Profile;