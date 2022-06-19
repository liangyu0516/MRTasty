/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const axios = require('axios');

const Main = styled.div`
	background-color: yellow;
`

const Title = styled.div`
	font-size: 3vw;
	font-weight: bolder;
	background-color: pink;
`

const Rating = styled.div`
	font-size: 1.2vw;
	background-color: green;
`

const Detail = styled.div`
	background-color: yellow;
`

function Restaurant() {
	const place_id = window.location.pathname.split("/")[2]
	const [info, setInfo] = useState()

	useEffect(() => {
		axios.get("http://localhost:3100/api/v1/restaurant/" + place_id)
		.then(function(response){
			console.log(response)
			setInfo(response.data.result)
		});
	}, []);

	return (
		<div style={{'font-family': 'Microsoft YaHei'}}>
			<Main>
				<Title>{info?.name}</Title>
				<Rating>評分：{info?.rating}</Rating>
				營業狀態：{info?.opening_hours?.open_now.toString() === 'true' ? '營業中':'休息中'}<br />
			</Main>
			<div style={{'display': 'flex', 'flex-direction': 'row'}}>
				<Detail>
					{info?.formatted_address}<br />
					{info?.opening_hours?.weekday_text.map((day) => (<div>{day}</div>))}			
					電話：{info?.formatted_phone_number}<br />
					網站：{info?.website}<br />
				</Detail>
				{info?.photos.map((photo) => (<img width={photo.width /50} height={photo.height/50} src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=' + photo.photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY'} />))}<br />
				評分數：{info?.user_ratings_total}<br />
			</div>
		</div>
	);
}

export default Restaurant;
