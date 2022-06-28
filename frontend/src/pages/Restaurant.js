/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import star from '../images/star.png'
import whitestar from '../images/whitestar.png'
import pencil from '../images/pencil.png'
import phone from '../images/phone.png'
import address from '../images/address.png'
import time from '../images/time.png'
import website from '../images/website.png'
import tagIcon from '../images/tag.png'
import profile from '../images/profile.png'
import restaurantImg from '../images/restaurant.png'
const axios = require('axios');

const Main = styled.div`
	margin-bottom: 5vh;
	display: flex;
	flex-direction: row;
`

const MainImg = styled.img`
	width: 20vw;
	height: 20vw;
	border-radius: 15px;
	box-shadow: 10px 10px 3px black;
`

const MainInfo = styled.div`
	width: 40vw;
	height: 18vw;
	margin-left: 3vw;
	padding: 1vw 2.5vw;
	text-align: left;
	border: 2px solid black;
	border-radius: 15px;
	box-shadow: 10px 10px 3px black;
	overflow: hidden;
`

const Title = styled.div`
	margin-bottom: 3vh;
	font-size: 2vw;
	font-weight: bolder;
`

const Ratings = styled.div`
	margin-bottom: 1.5vh;
	display: flex;
	flex-direction: row;
`

const Rating = styled.div`
	width: 5vw;
	margin-right: 1vw;
	padding: 0.7vw 0.5vw;
	font-size: 1vw;
	font-weight: bolder;
	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 0px 2px 1px black;
	background-color: 	#FFFFAA;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const RatingImg = styled.img`
	width: 1.5vw;
	height: 1.5vw;
`

const Open = styled.div`
	width: 5vw;
	margin-bottom: 1.5vh;
	padding: 0.7vw 0.5vw;
	font-size: 1vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 0px 2px 1px black;
	background-color: #BBFFBB;
`

const Close = styled.div`
	width: 5vw;
	margin-bottom: 1vh;
	padding: 0.7vw 0.5vw;
	font-size: 1vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 0px 2px 1px black;
	background-color: #FF5151;
`

const Tags = styled.div`
	margin-bottom: 1vh;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Tag = styled.div`
	width: 4.4vw;
	margin-right: 1vw;
	padding: 0.7vw 0.8vw;
	font-size: 1vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 0px 2px 1px black;
	background-color: #ACD6FF;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const TagImg = styled.img`
	width: 1.5vw;
	height: 1.5vw;
	margin-right: 0.5vw;
`

const Detail = styled.div`
	display: flex;
	flex-direction: row;
`

const DetailInfo = styled.div`
	width: 15vw;
	height: 110vh;
	margin-right: 3vw;
	padding: 2vw 2.5vw 0.5vw;
	text-align: left;
	border: 2px solid black;
	border-radius: 15px;
	box-shadow: 0px 5px 2px black;
`

const DetailInfoTitle = styled.div`
	font-size: 1.5vw;
	margin-bottom: 1vh;
	color: #009393;
	font-weight: 600;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const DetailInfoImg = styled.img`
	width: 1.5vw;
	height: 1.5vw;
	margin-right: 0.3vw;
`

const DetailInfoContent = styled.div`
	margin-bottom: 5vh;
`

const DetailExperience = styled.div`
	display: flex;
	flex-direction: column;
`

const Comment = styled.div`
	width: 40vw;
	height: 24vh;
	margin-bottom: 3vh;
	padding: 2vh 2.5vw;
	text-align: left;
	border: 2px solid black;
	border-radius: 15px;
	box-shadow: 0px 5px 2px black;
	display: flex;
	flex-direction: column;
`

const CommentProfileImg = styled.img`
	width: 3vw;
	height: 3vw;
	margin-bottom: 2vh;
`

const CommentStars = styled.div`
	margin-bottom: 1.5vh;
	display: flex;
	flex-direction: row;
`

const CommentContent = styled.textarea`
	width: 100%;
	max-width: 100%;
	height: 10vh;
	border: 2px solid black;
	border-radius: 5px;
`

const Reviews = styled.div`
	width: 40vw;
	height: 80vh;
	padding: 10px 2.5vw;
	text-align: left;
	border: 2px solid black;
	border-radius: 15px;
	box-shadow: 0px 5px 2px black;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	&::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}
	&::-webkit-scrollbar
	{
		width: 0.7vw;
	}
	&::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #336666;
	}
`

const Review = styled.div`
	margin: 1vh 0;
	padding: 2vw 0vw;
	text-align: left;
	border-bottom: 1px solid #408080;
`

const StarsTime = styled.div`
	margin-bottom: 1.5vh;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Time = styled.div`
	font-size: 1vw;
	margin-left: 2vh;
	color: #8E8E8E;
`

const ReviewContent = styled.div`
	font-size: 1vw;
`

function Restaurant(props) {
	const place_id = window.location.pathname.split("/")[2]
	const [info, setInfo] = useState()
	const [reviews, setReviews] = useState()
	const [tags, setTags] = useState()
	const [rate, setRate] = useState(0)

	useEffect(() => {
		axios.get("http://localhost:3100/api/v1/restaurant/" + place_id)
		.then(function(response){
			console.log(response)
			setInfo(response.data.result)
		});
		axios.get("http://localhost:3100/api/v1/review/" + place_id, {
			headers: { Authorization: `Bearer ` + props.token }
		})
		.then(function(response){
			console.log(response)
			setReviews(response.data)
		});
		axios.get("http://localhost:3100/api/v1/tag/" + place_id)
		.then(function(response){
			console.log(response)
			setTags(response.data)
		});
	}, [props.token]);

	function handleClickOnStar(starID) {
		setRate(starID)
	}
	
	return (
		<div style={{'padding': '5vh 15vw', 'font-family': 'Microsoft YaHei', 'background-color': 'rgb(231, 243, 243)'}}>
			<Main>
				<MainImg src={info && Object.keys(info).includes("photos") ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=' + info?.photos[1].photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY':restaurantImg} />
				<MainInfo>
					<Title>{info?.name}</Title>
					{info?.opening_hours?.open_now.toString() === 'true' ? <Open>營業中</Open>:<Close>休息中</Close>}
					<Ratings>
						<Rating>
							<RatingImg src={star} />
							<div style={{'margin-left': '0.5vw'}}>{info?.rating}</div>
						</Rating>
						<Rating>
							<RatingImg src={pencil} />
							<div style={{'margin-left': '0.5vw'}}>{info?.user_ratings_total}</div>
						</Rating>
					</Ratings>
					<Tags>
						{tags?.map((tag) => (
							<Tag>
								<TagImg src={tagIcon} />
								<div>{tag.Tag}</div>
							</Tag>
						))}
					</Tags>
				</MainInfo>
			</Main>
			<Detail>
				<DetailInfo>
					<DetailInfoTitle>
						<DetailInfoImg src={phone} />電話
					</DetailInfoTitle>
					<DetailInfoContent>{info?.formatted_phone_number ?? '無'}</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={address} />地址
					</DetailInfoTitle>
					<DetailInfoContent>{info?.formatted_address}</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={time} />營業時間
					</DetailInfoTitle>
					<DetailInfoContent>
						{info?.opening_hours?.weekday_text.map((day) => (<div>{day}</div>))}
					</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={website} />網站
					</DetailInfoTitle>
					<DetailInfoContent>{info?.website ? <a href={info?.website}>點我前往</a>:'無'}</DetailInfoContent>
				</DetailInfo>
				<DetailExperience>
					<Comment>
						<CommentProfileImg src={profile} />
						<CommentStars>
							{[0, 0, 0, 0, 0].fill(1, 0, rate).map((type, index) => (
								<RatingImg style={{ 'cursor': 'pointer'}} src={type === 1 ? star:whitestar} onClick={() => handleClickOnStar(index + 1)} />
							))}
						</CommentStars>
						<CommentContent />
					</Comment>
					<Reviews>
						{reviews?.slice(0, 100).map((review) => (
							<Review>
								<StarsTime>
									{new Array(review.Rate).fill(null).map(() => (
										<RatingImg src={star} />
									))}
									<Time>{review.Time}</Time>
								</StarsTime>
								<ReviewContent>{review.Content}</ReviewContent>
							</Review>
						))}
					</Reviews>
				</DetailExperience>
			</Detail>
		</div>
	);
}

export default Restaurant;
/* 
{info?.photos.map((photo) => (<img width={photo.width /50} height={photo.height/50} src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=' + photo.photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY'} />))}<br />
				評分數：{info?.user_ratings_total}<br /> 
				*/