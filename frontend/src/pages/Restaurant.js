/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from "sweetalert2";
import star from '../images/star.png'
import whitestar from '../images/whitestar.png'
import pencil from '../images/pencil.png'
import phone from '../images/phone.png'
import address from '../images/address.png'
import time from '../images/time.png'
import website from '../images/website.png'
import tagIcon from '../images/tag.png'
import profile from '../images/profile.png'
import uncollect from '../images/uncollect.png'
import collect from '../images/collect.png'
import restaurantImg from '../images/restaurant.png'
const axios = require('axios');

const Main = styled.div`
	margin-bottom: 2vh;
	display: flex;
	flex-direction: row;
`

const MainImg = styled.img`
	width: 16vw;
	height: 16vw;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const MainInfo = styled.div`
	width: 43vw;
	height: 14vw;
	margin-left: 1vw;
	padding: 1vw 2.5vw;
	text-align: left;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
	overflow: hidden;
`

const Title = styled.div`
	margin-bottom: 3vh;
	color: rgb(46, 92, 92);
	display: flex;
	flex-direction: row;
	align-items: center;
`

const TitleName = styled.div`
	margin-right: 1vw;
	font-size: 2vw;
	font-weight: bolder;
`

const CollectImg = styled.img`
	width: 1.8vw;
	height: 1.8vw;
	cursor: pointer;
`

const Ratings = styled.div`
	margin-bottom: 1.5vh;
	display: flex;
	flex-direction: row;
`

const Rating = styled.div`
	width: 5vw;
	margin-right: 1vw;
	padding: 0.7vw 0.2vw;
	font-size: 0.5vw;
	font-weight: bolder;
	text-align: center;
	border-radius: 5px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: #FFFFAA;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const RatingImg = styled.img`
	width: 1vw;
	height: 1vw;
`

const Open = styled.div`
	width: 5vw;
	margin-bottom: 1.5vh;
	padding: 0.7vw 0.2vw;
	font-size: 0.5vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border-radius: 5px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: #A6FFA6;
`

const Close = styled.div`
	width: 5vw;
	margin-bottom: 1vh;
	padding: 0.7vw 0.2vw;
	font-size: 0.5vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border-radius: 5px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
	padding: 0.7vw 0.5vw;
	font-size: 0.5vw;
	font-weight: bolder;
	letter-spacing: 0.1vw;
	text-align: center;
	border-radius: 5px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: #ACD6FF;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const TagImg = styled.img`
	width: 1vw;
	height: 1vw;
	margin-right: 0.5vw;
`

const Detail = styled.div`
	display: flex;
	flex-direction: row;
`

const DetailInfo = styled.div`
	width: 11vw;
	height: 110vh;
	margin-right: 1vw;
	padding: 2vw 2.5vw 0.5vw;
	font-size: 1.1vw;
	text-align: left;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
`

const DetailInfoTitle = styled.div`
	font-size: 1.3vw;
	margin-bottom: 1vh;
	color: #009393;
	font-weight: 600;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const DetailInfoImg = styled.img`
	width: 1.3vw;
	height: 1.3vw;
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
	width: 36.5vw;
	height: 29vh;
	margin-bottom: 2vh;
	padding: 2vh 2.5vw;
	text-align: left;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
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

const CommentStarImg = styled.img`
	width: 1.5vw;
	height: 1.5vw;
`

const CommentContent = styled.textarea`
	width: 100%;
	max-width: 100%;
	height: 10vh;
	margin-bottom: 1vh;
	border: 2px solid black;
	border-radius: 5px;
`

const CommentSubmit = styled.button`
	width: 4vw;
	padding: 1vh 0;
	font-size: 0.8vw;
	font-weight: 600;
	background-color: white;
	border: 2px solid black;
	border-radius: 5px;
	box-shadow: 0px 3px 1px black;
	cursor: pointer;
`

const Reviews = styled.div`
	width: 36.5vw;
	height: 76vh;
	padding: 4vh 2.5vw 0;
	text-align: left;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
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
	margin: 0 0 4vh;
	padding-bottom: 4vh;
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
	const [comment, setComment] = useState('')
	const [isCollected , setIsCollected] = useState(false)
	const [rerender, setRerender] = useState(0)

	useEffect(() => {
		axios.get("http://184.169.138.82:3100/api/v1/collect/" + place_id, {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response) {
				if(response.data.isCollected) { setIsCollected(true) } else { setIsCollected(false) }
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		axios.get("http://184.169.138.82:3100/api/v1/restaurant/" + place_id)
		.then(function(response){
			console.log(response)
			setInfo(response.data)
		});
		axios.get("http://184.169.138.82:3100/api/v1/review/" + place_id)
		.then(function(response){
			console.log(response)
			setReviews(response.data)
		});
		axios.get("http://184.169.138.82:3100/api/v1/tag/" + place_id)
		.then(function(response){
			console.log(response)
			setTags(response.data)
		});
	}, [rerender]);

	function handleCollect() {
		if(isCollected) {
			axios.delete("http://184.169.138.82:3100/api/v1/collect/" + place_id, {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response) {
				setIsCollected(false)
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
		} 
		else {
			axios.post("http://184.169.138.82:3100/api/v1/collect", { place_id: place_id }, {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response) {
				setIsCollected(true)
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
				Swal.fire({
					icon: 'warning',
					title: '登入才可以收藏哦 :O',
				})
			})
		}
	}

	function handleClickOnStar(starID) {
		setRate(starID)
	}

	function handleClickOnCommentSumbit(rate, comment) {
		if(rate === 0) {
			Swal.fire({
				icon: 'warning',
				title: '請選擇星等 :O',
			})
		}
		else {
			const data = {
				rate: rate,
				comment: comment
			}
			axios.post("http://184.169.138.82:3100/api/v1/review/" + place_id, data, {
				headers: { Authorization: `Bearer ` + props.token }
			})
			.then(function(response){
				console.log(response)
				setRate(0)
				setComment('')
				setRerender(rerender + 1)
			})
			.catch(function(error) {
				Swal.fire({
					icon: 'warning',
					title: '請先登入 :O',
				})
			});
		}
	}
	
	return (
		<div style={{'padding': '5vh 20vw', 'font-family': 'Microsoft YaHei', 'background-color': 'rgb(231, 243, 243)'}}>
			<Main>
				<MainImg src={info?.Photo_reference !== null ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=' + info?.Photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY':restaurantImg } />
				<MainInfo>
					<Title>
						<TitleName>{info?.Name}</TitleName>
						<CollectImg src={isCollected ? collect:uncollect} onClick={() => handleCollect()}/>
					</Title>
					{info?.Opening_hours?.open_now.toString() === 'true' ? <Open>營業中</Open>:<Close>休息中</Close>}
					<Ratings>
						<Rating>
							<RatingImg src={star} />
							<div style={{'margin-left': '0.5vw'}}>{info?.Rating}</div>
						</Rating>
						<Rating>
							<RatingImg src={pencil} />
							<div style={{'margin-left': '0.5vw'}}>{info?.Total_ratings}</div>
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
					<DetailInfoContent>{info?.Phone ?? '無'}</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={address} />地址
					</DetailInfoTitle>
					<DetailInfoContent>{info?.Address}</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={time} />營業時間
					</DetailInfoTitle>
					<DetailInfoContent>
						{info?.Opening_hours?.weekday_text.map((day) => (<div>{day}</div>))}
					</DetailInfoContent>
					<DetailInfoTitle>
						<DetailInfoImg src={website} />網站
					</DetailInfoTitle>
					<DetailInfoContent>{info?.Website ? <a href={info?.Website} style={{ 'color': 'black' }}>點我前往</a>:'無'}</DetailInfoContent>
				</DetailInfo>
				<DetailExperience>
					<Comment>
						<CommentProfileImg src={profile} />
						<CommentStars>
							{[0, 0, 0, 0, 0].fill(1, 0, rate).map((type, index) => (
								<CommentStarImg style={{ 'cursor': 'pointer'}} src={type === 1 ? star:whitestar} onClick={() => handleClickOnStar(index + 1)} />
							))}
						</CommentStars>
						<CommentContent value={comment} onChange={(e) => setComment(e.target.value)} />
						<CommentSubmit onClick={() => handleClickOnCommentSumbit(rate, comment)}>送出</CommentSubmit>
					</Comment>
					<Reviews>
						{!reviews || reviews.length === 0 ? '目前尚未有評論，快來寫下你的感想吧！':reviews.slice(0, 100).map((review) => (
							<Review>
								<StarsTime>
									{new Array(review.Rate).fill(null).map(() => (
										<RatingImg src={star} />
									))}
									<Time>{typeof review.Time == 'string' ? review.Time:''}</Time>
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
