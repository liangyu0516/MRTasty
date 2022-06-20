/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import styled from 'styled-components'
import restaurantImg from '../images/restaurant.png'
import {Link} from "react-router-dom";
const axios = require('axios');

const SearchBar = styled.input`
	width: 8vw;
	font-size: 1.5vw;
	background-color: pink;
`

const SearchButton = styled.button`
	color: white;
	font-size: 1.5vw;
	background-color: black;
	border-radius: 10px;
	cursor: pointer;
`

const MapTitle = styled.div`
	margin: 1vh 0;
	font-family: Microsoft YaHei;
	font-size: 2.5vw;
	background-color: #D7FFEE;
`

const MapContainer = styled.div`
	height: 82vh;
	width: 65vw;
	overflow: scroll;
`

const Restaurants = styled.a`
	width: 25vw;
	display: flex;
	font-family: Microsoft YaHei;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	border: 2px solid gray;
`

const StationTitle = styled.div`
	margin: 1.5vh 0;
	padding: 5px 15px;
	font-size: 2.5vw;
	color: white;
	border-radius: 15px;
	background-color: blue;
	box-shadow: 10px 5px 5px black;
`

const Restaurant = styled.div`
	margin-bottom: 10px;
	padding: 2vh;
	width: 18vw;
	border-radius: 25px;
	border: 2px solid blue;
	display: flex;
	flex-direction: row;
`

const RestaurantTitle = styled.div`
	margin-bottom: 10px;
	font-size: 1.3vw;
`

const MainImg = styled.img`
	width: 7vw;
	height: 7vw;
`

const Info = styled.div`
	margin-left: 0.3vw;
	width: 10vw;
	text-align: left;
	background-color: white;
	border: 2px solid black;
`

const RStation = styled.g`
	font-size: 15;
	cursor: pointer;
	&:hover #childRect {
		color: white;
		fill: red;
	}
	&:hover #childText {
		fill: white;
	}
`

const BLStation = styled.g`
	font-size: 15;
	cursor: pointer;
	&:hover #childRect {
		color: white;
		fill: blue;
	}
	&:hover #childText {
		fill: white;
	}
`

function Map(props) {
  	const [color, setColor] = useState('white')
  	const [restaurants, setRestaurants] = useState([])
  	const [typeInput, setTypeInput] = useState('')
  	const [type, setType] = useState('')
  	const [station, setStation] = useState()
	const [isHovering, setIsHovering] = useState(false)

	async function handleClickOnStation (station) {
		setStation(station.chinese)
		await axios.get("http://localhost:3100/api/v1/restaurant?keyword=" + props.type + "&station=" + station.english)
		.then(function(response){
			console.log(response)
			setRestaurants(response.data.results)
		});
	}

	return (
		<div style={ {'display': 'flex', 'flex-direction': 'row'} }>
			<div style={ {'width': '10vw', 'background-color': '#E0E0E0'} }>
				<SearchBar id='type' name="type" value={typeInput} onChange={(e) => setTypeInput(e.target.value)}/>
				<SearchButton onClick={() => setType(typeInput)}>搜尋</SearchButton>
				{isHovering && (
					<div>
						西門
					</div>
				)}
			</div>
			<div>
				<MapTitle>台北捷運{props.type}地圖</MapTitle>
				<MapContainer>
					<svg height="200vh" width="100vw" font-weight='600'>
						<path strokeLinejoin="round" strokeLinecap="round" fill='white' d="M168 70 L168 315 Q173,360 218,365 L550 365 Q595,370 600,415 L600 1367 L 1500 1367" stroke="red" strokeWidth="10" />
						<RStation id='Tamsui' onClick={() => handleClickOnStation({'english': 'Tamsui', 'chinese': '淡水'})}>
							<rect id='childRect' x="150" y="50" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="162" y="67" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="159" y="81" font-family="Montserrat, sans-serif" fill="black">28</text>
							<text x="110" y="65" font-family="Microsoft YaHei" fill="black">淡水</text>
							<text x="100" y="80" font-family="Montserrat, sans-serif" font-size="12" fill="black">Tamsui</text>
						</RStation>
						<RStation id='Hongshulin' onClick={() => handleClickOnStation({'english': 'Hongshulin', 'chinese': '紅樹林'})}>
							<rect id='childRect' x="150" y="125" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="162" y="142" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="159" y="156" font-family="Montserrat, sans-serif" fill="black">27</text>
							<text x="95" y="140" font-family="Microsoft YaHei" fill="black">紅樹林</text>
							<text x="77" y="155" font-family="Montserrat, sans-serif" font-size="12" fill="black">Hongshulin</text>
						</RStation>
						<RStation id='Zhuwei' onClick={() => handleClickOnStation({'english': 'Zhuwei', 'chinese': '竹圍'})}>
							<rect id='childRect' x="150" y="200" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="162" y="217" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="159" y="231" font-family="Montserrat, sans-serif" fill="black">26</text>
							<text x="110" y="215" font-family="Microsoft YaHei" fill="black">竹圍</text>
							<text x="100" y="230" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhuwei</text>
						</RStation>
						<RStation id='Guandu' onClick={() => handleClickOnStation({'english': 'Guandu', 'chinese': '關渡'})}>
							<rect id='childRect' x="150" y="275" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="162" y="292" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="159" y="306" font-family="Montserrat, sans-serif" fill="black">25</text>
							<text x="110" y="290" font-family="Microsoft YaHei" fill="black">關渡</text>
							<text x="97" y="305" font-family="Montserrat, sans-serif" font-size="12" fill="black">Guandu</text>
						</RStation>
						<RStation id='Zhongyi' onClick={() => handleClickOnStation({'english': 'Zhongyi', 'chinese': '忠義'})}>
							<rect id='childRect' x="225" y="348" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="237" y="365" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="234" y="379" font-family="Montserrat, sans-serif" fill="black">24</text>
							<text x="227" y="401" font-family="Microsoft YaHei" fill="black">忠義</text>
							<text x="218" y="416" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongyi</text>
						</RStation>
						<RStation id='Fuxinggang' onClick={() => handleClickOnStation({'english': 'Fuxinggang', 'chinese': '復興崗'})}>
							<rect id='childRect' x="300" y="348" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="312" y="365" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="309" y="379" font-family="Montserrat, sans-serif" fill="black">23</text>
							<text x="293" y="401" font-family="Microsoft YaHei" fill="black">復興崗</text>
							<text x="283" y="416" font-family="Montserrat, sans-serif" font-size="12" fill="black">Fuxinggang</text>
						</RStation>
						<RStation id='Beitou' onClick={() => handleClickOnStation({'english': 'Beitou', 'chinese': '北投'})}>
							<rect id='childRect' x="375" y="348" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="387" y="365" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="384" y="379" font-family="Montserrat, sans-serif" fill="black">22</text>
							<text x="377" y="401" font-family="Microsoft YaHei" fill="black">北投</text>
							<text x="375" y="416" font-family="Montserrat, sans-serif" font-size="12" fill="black">Beitou</text>
						</RStation>
						<RStation id='Qiyan' onClick={() => handleClickOnStation({'english': 'Qiyan', 'chinese': '奇岩'})}>
							<rect id='childRect' x="450" y="348" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="462" y="365" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="459" y="379" font-family="Montserrat, sans-serif" fill="black">21</text>
							<text x="452" y="401" font-family="Microsoft YaHei" fill="black">奇岩</text>
							<text x="452" y="416" font-family="Montserrat, sans-serif" font-size="12" fill="black">Qiyan</text>
						</RStation>
						<RStation id='Qilian' onClick={() => handleClickOnStation({'english': 'Qilian', 'chinese': '唭哩岸'})}>
							<rect id='childRect' x="525" y="348" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="537" y="365" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="534" y="379" font-family="Montserrat, sans-serif" fill="black">20</text>
							<text x="518" y="401" font-family="Microsoft YaHei" fill="black">唭哩岸</text>
							<text x="527" y="416" font-family="Montserrat, sans-serif" font-size="12" fill="black">Qilian</text>
						</RStation>
						<RStation id='Shipai' onClick={() => handleClickOnStation({'english': 'Shipai', 'chinese': '石牌'})}>
							<rect id='childRect' x="582" y="423" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="440" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="454" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="622" y="438" font-family="Microsoft YaHei" fill="black">石牌</text>
							<text x="622" y="453" font-family="Montserrat, sans-serif" font-size="12" fill="black">Shipai</text>
						</RStation>
						<RStation id='Mingde' onClick={() => handleClickOnStation({'english': 'Mingde', 'chinese': '明德'})}>
							<rect id='childRect' x="582" y="498" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="515" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="529" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="622" y="513" font-family="Microsoft YaHei" fill="black">明德</text>
							<text x="622" y="528" font-family="Montserrat, sans-serif" font-size="12" fill="black">Mingde</text>
						</RStation>
						<RStation id='Zhishan' onClick={() => handleClickOnStation({'english': 'Zhishan', 'chinese': '芝山'})}>
							<rect id='childRect' x="582" y="573" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="590" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="604" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="622" y="588" font-family="Microsoft YaHei" fill="black">芝山</text>
							<text x="622" y="603" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhishan</text>
						</RStation>
						<RStation id='Shilin' onClick={() => handleClickOnStation({'english': 'Shilin', 'chinese': '士林'})}>
							<rect id='childRect' x="582" y="648" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="665" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="679" font-family="Montserrat, sans-serif" fill="black">16</text>
							<text x="622" y="663" font-family="Microsoft YaHei" fill="black">士林</text>
							<text x="622" y="678" font-family="Montserrat, sans-serif" font-size="12" fill="black">Shilin</text>
						</RStation>
						<RStation id='Jiantan' onClick={() => handleClickOnStation({'english': 'Jiantan', 'chinese': '劍潭'})}>
							<rect id='childRect' x="582" y="723" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="739" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="753" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="622" y="737" font-family="Microsoft YaHei" fill="black">劍潭</text>
							<text x="622" y="752" font-family="Montserrat, sans-serif" font-size="12" fill="black">Jiantan</text>
						</RStation>
						<RStation id='Yuanshan' onClick={() => handleClickOnStation({'english': 'Yuanshan', 'chinese': '圓山'})}>
							<rect id='childRect' x="582" y="798" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="815" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="829" font-family="Montserrat, sans-serif" fill="black">14</text>
							<text x="622" y="813" font-family="Microsoft YaHei" fill="black">圓山</text>
							<text x="622" y="828" font-family="Montserrat, sans-serif" font-size="12" fill="black">Yuanshan</text>
						</RStation>
						<RStation id='Minquan W. Rd.' onClick={() => handleClickOnStation({'english': 'Minquan W. Rd.', 'chinese': '民權西路'})}>
							<rect id='childRect' x="582" y="900" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="917" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="931" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="622" y="870" font-family="Microsoft YaHei" fill="black">民權西路</text>
							<text x="622" y="885" font-family="Montserrat, sans-serif" font-size="12" fill="black">Minquan</text>
							<text x="622" y="895" font-family="Montserrat, sans-serif" font-size="12" fill="black">W. Rd.</text>
						</RStation>
						<RStation id='Shuanglian' onClick={() => handleClickOnStation({'english': 'Shuanglian', 'chinese': '雙連'})}>
							<rect id='childRect' x="582" y="975" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="992" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="1006" font-family="Montserrat, sans-serif" fill="black">12</text>
							<text x="622" y="990" font-family="Microsoft YaHei" fill="black">雙連</text>
							<text x="622" y="1005" font-family="Montserrat, sans-serif" font-size="12" fill="black">Shuanglian</text>
						</RStation>
						<RStation id='Zhongshan' onClick={() => handleClickOnStation({'english': 'Zhongshan', 'chinese': '中山'})}>
							<rect id='childRect' x="582" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="1067" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="591" y="1081" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="622" y="1032" font-family="Microsoft YaHei" fill="black">中山</text>
							<text x="622" y="1047" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongshan</text>
						</RStation>
						<RStation id='Taipei Main Station' onClick={() => handleClickOnStation({'english': 'Taipei Main Station', 'chinese': '台北車站'})}>
							<rect id='childRect' x="582" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="1217" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="590" y="1231" font-family="Montserrat, sans-serif" fill="black">10</text>
							<text x="622" y="1170" font-family="Microsoft YaHei" fill="black">台北車站</text>
							<text x="622" y="1185" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei Main</text>
							<text x="622" y="1195" font-family="Montserrat, sans-serif" font-size="12" fill="black">Station</text>
						</RStation>
						<RStation id='NTU Hospital' onClick={() => handleClickOnStation({'english': 'NTU Hospital', 'chinese': '台大醫院'})}>
							<rect id='childRect' x="582" y="1275" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="1292" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="591" y="1306" font-family="Montserrat, sans-serif" fill="black">09</text>
							<text x="622" y="1290" font-family="Microsoft YaHei" fill="black">台大醫院</text>
							<text x="622" y="1305" font-family="Montserrat, sans-serif" font-size="12" fill="black">NTU Hospital</text>
						</RStation>
						<RStation id='Chiang Kai-Shek Memorial Hall' onClick={() => handleClickOnStation({'english': 'Chiang Kai-Shek Memorial Hall', 'chinese': '中正紀念堂'})}>
							<rect id='childRect' x="582" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="594" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="591" y="1381" font-family="Montserrat, sans-serif" fill="black">08</text>
							<text x="500" y="1403" font-family="Microsoft YaHei" fill="black">中正紀念堂</text>
							<text x="485" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Chiang Kai-Shek</text>
							<text x="502" y="1428" font-family="Montserrat, sans-serif" font-size="12" fill="black">Memorial Hall</text>
						</RStation>
					</svg>
				</MapContainer>
			</div>
			<Restaurants>
				<StationTitle>{station}</StationTitle>
				{restaurants.map((restaurant) => (
					<Link to={'/restaurant/' + restaurant.place_id} style={{ textDecoration: 'none', color: 'black' }}>
						<Restaurant key={restaurant.name} >
							<MainImg src={restaurant.photos === undefined ? restaurantImg:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=' + restaurant.photos[0].photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY'}/>
							<Info>
								<RestaurantTitle>{restaurant.name}</RestaurantTitle>
								<div>評分：{restaurant.rating}</div>
							</Info>
						</Restaurant>
					</Link>
				))}
			</Restaurants>
		</div>
	);
}

export default Map;

/*
<path strokeLinejoin="round" strokeLinecap="round" fill='white' d="M323 600 L323 110 Q328,65 373,60 L 720 60 Q765,65 770,110 L770 360" stroke="#b8860b" strokeWidth="10" />
						<path strokeLinejoin="round" strokeLinecap="round" d="M5 600 L720 600 Q765,595 770,550 L770 360" fill='none' stroke="#0000ff" strokeWidth="10" />
						<BLStation id='Ximen' onClick={() => handleClickOnStation({'english': 'Ximen', 'chinese': '西門'})} onMouseOver={e => {setIsHovering(true)}} onMouseOut={e => {setIsHovering(false)}}>
							<rect id='childRect' x="5" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="12" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="14" y="613" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="8" y="635" font-family="Microsoft YaHei" fill="black">西門</text>
							<text x="8" y="648" font-family="Montserrat, sans-serif" font-size="10" fill="black">Ximen</text>
						</BLStation>
						<BLStation id='Taipei Main Station' onClick={() => handleClickOnStation({'english': 'Taipei Main Station', 'chinese': '台北車站'})}>
							<rect id='childRect' x="80" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="87" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="89" y="613" font-family="Montserrat, sans-serif" fill="black">12</text>
							<text x="70" y="635" font-family="Microsoft YaHei" fill="black">台北車站</text>
							<text x="73" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Taipei Main</text>
							<text x="84" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Station</text>
						</BLStation>
						<g id='Shandao Temple' font-size="15" onClick={() => handleClickOnStation({'english': 'Shandao Temple', 'chinese': '善導寺'})}>
							<rect x="155" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2"/>
							<text x="163" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="164" y="613" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="150" y="635" font-family="Microsoft YaHei"  fill="black">善導寺</text>
							<text x="152" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Shandao</text>
							<text x="155" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Temple</text>
						</g>
						<g id='Zhongxiao Xinsheng' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Xinsheng')}>
							<rect x="230" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="237" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="238" y="613" font-family="Montserrat, sans-serif" fill="black">14</text>
							<text x="218" y="635" font-family="Microsoft YaHei" fill="black">忠孝新生</text>
							<text x="223" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
							<text x="227" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Xinsheng</text>
						</g>
						<g id='Zhongxiao Fuxing' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Fuxing')}>
							<rect x="305" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="312" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="313" y="613" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="292" y="635" font-family="Microsoft YaHei" fill="black">忠孝復興</text>
							<text x="297" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
							<text x="307" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Fuxing</text>
						</g>
						<g id='Zhongxiao Dunhua' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Dunhua')}>
							<rect x="380" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="387" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="388" y="613" font-family="Montserrat, sans-serif" fill="black">16</text>
							<text x="368" y="635" font-family="Microsoft YaHei" fill="black">忠孝敦化</text>
							<text x="373" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
							<text x="381" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Dunhua</text>
						</g>
						<g id='Sun Yat-Sen Memorial Hall' font-size="15" onClick={() => handleClickOnStation('Sun Yat-Sen Memorial Hall')}>
							<rect x="455" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="462" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="463" y="613" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="435" y="635" font-family="Microsoft YaHei" fill="black">國父紀念館</text>
							<text x="445" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Sun Yat-Sen</text>
							<text x="442" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Memorial Hall</text>
						</g>
						<g id='Taipei City Hall' font-size="15" onClick={() => handleClickOnStation('Taipei City Hall')}>
							<rect x="530" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="537" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="538" y="613" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="526" y="635" font-family="Microsoft YaHei" fill="black">市政府</text>
							<text x="535" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Taipei</text>
							<text x="528" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">City Hall</text>
						</g>
						<g id='Yongchun' font-size="15" onClick={() => handleClickOnStation('Yongchun')}>
							<rect x="605" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="612" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="613" y="613" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="608" y="635" font-family="Microsoft YaHei" fill="black">永春</text>
							<text x="600" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Yongchun</text>
						</g>
						<g id='Houshanpi' font-size="15" onClick={() => handleClickOnStation('Houshanpi')}>
							<rect x="680" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="687" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="689" y="613" font-family="Montserrat, sans-serif" fill="black">20</text>
							<text x="676" y="635" font-family="Microsoft YaHei" fill="black">後山埤</text>
							<text x="674" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Houshanpi</text>
						</g>
						<g id='Kunyang' font-size="15" onClick={() => handleClickOnStation('Kunyang')}>
							<rect x="753" y="500" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="760" y="517" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="762" y="530" font-family="Montserrat, sans-serif" fill="black">21</text>
							<text x="715" y="515" font-family="Microsoft YaHei" fill="black">昆陽</text>
							<text x="702" y="530" font-family="Montserrat, sans-serif" font-size="10" fill="black">Kunyang</text>
						</g>
						<g id='Nangang' font-size="15" onClick={() => handleClickOnStation('Nangang')}>
							<rect x="753" y="425" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="760" y="442" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="762" y="455" font-family="Montserrat, sans-serif" fill="black">22</text>
							<text x="715" y="440" font-family="Microsoft YaHei" fill="black">南港</text>
							<text x="702" y="455" font-family="Montserrat, sans-serif" font-size="10" fill="black">Nangang</text>
						</g>
						<g id='Taipei Nangang Exhibition Center' font-size="15" onClick={() => handleClickOnStation({'english': 'Taipei Nangang Exhibition Center', 'chinese': '南港展覽館'})}>
							<rect x="753" y="350" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text x="760" y="367" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text x="762" y="380" font-family="Montserrat, sans-serif" fill="black">23</text>
							<text x="670" y="365" font-family="Microsoft YaHei" fill="black">南港展覽館</text>
							<text x="670" y="380" font-family="Montserrat, sans-serif" font-size="10" fill="black">Taipei Nangang</text>
							<text x="660" y="390" font-family="Montserrat, sans-serif" font-size="10" fill="black">Exhibition Center</text>
						</g>
						<g id='Nangang Software Park' font-size="15" onClick={() => handleClickOnStation({'english': 'Nangang Software Park', 'chinese': '南港軟體園區'})}>
							<rect x="753" y="275" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="760" y="292" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="762" y="305" font-family="Montserrat, sans-serif" fill="black">23</text>
							<text x="655" y="290" font-family="Microsoft YaHei" fill="black">南港軟體園區</text>
							<text x="633" y="305" font-family="Montserrat, sans-serif" font-size="10" fill="black">Nangang Software Park</text>
						</g>
						<g id='Donghu' font-size="15" onClick={() => handleClickOnStation({'english': 'Donghu', 'chinese': '東湖'})}>
							<rect x="753" y="200" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="760" y="217" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="762" y="230" font-family="Montserrat, sans-serif" fill="black">22</text>
							<text x="715" y="215" font-family="Microsoft YaHei" fill="black">東湖</text>
							<text x="707" y="230" font-family="Montserrat, sans-serif" font-size="10" fill="black">Donghu</text>
						</g>
						<g id='Huzhou' font-size="15" onClick={() => handleClickOnStation({'english': 'Huzhou', 'chinese': '葫洲'})}>
							<rect x="753" y="125" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="760" y="142" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="762" y="155" font-family="Montserrat, sans-serif" fill="black">21</text>
							<text x="715" y="140" font-family="Microsoft YaHei" fill="black">葫洲</text>
							<text x="708" y="155" font-family="Montserrat, sans-serif" font-size="10" fill="black">Huzhou</text>
						</g>
						<g id='Nanjing Fuxing' font-size="15" onClick={() => handleClickOnStation('Nanjing Fuxing')}>
							<rect x="305" y="425" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="312" y="442" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="315" y="455" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="350" y="440" font-family="Microsoft YaHei" fill="black">南京復興</text>
							<text x="350" y="455" font-family="Montserrat, sans-serif" font-size="10" fill="black">Nanjing Fuxing</text>
						</g>
						<g id='Zhongshan Junior High School' font-size="15" onClick={() => handleClickOnStation('Zhongshan Junior High School')}>
							<rect x="305" y="350" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="312" y="367" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="315" y="380" font-family="Montserrat, sans-serif" fill="black">12</text>
							<text x="350" y="365" font-family="Microsoft YaHei" fill="black">中山國中</text>
							<text x="350" y="380" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongshan</text>
							<text x="350" y="390" font-family="Montserrat, sans-serif" font-size="10" fill="black">Junior High School</text>
						</g>
						<g id='Songshan Airport' font-size="15" onClick={() => handleClickOnStation({'english': 'Songshan Airport', 'chinese': '松山機場'})}>
							<rect x="305" y="275" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="312" y="292" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="315" y="305" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="350" y="290" font-family="Microsoft YaHei" fill="black">松山機場</text>
							<text x="350" y="305" font-family="Montserrat, sans-serif" font-size="10" fill="black">Songshan Airport</text>
						</g>
						<g id='Dazhi' font-size="15" onClick={() => handleClickOnStation({'english': 'Dazhi', 'chinese': '大直'})}>
							<rect x="305" y="200" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="312" y="217" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="315" y="230" font-family="Montserrat, sans-serif" fill="black">14</text>
							<text x="350" y="215" font-family="Microsoft YaHei" fill="black">大直</text>
							<text x="350" y="230" font-family="Montserrat, sans-serif" font-size="10" fill="black">Dazhi</text>
						</g>
						<g id='Jiannan Rd.' font-size="15" onClick={() => handleClickOnStation({'english': 'Jiannan Rd.', 'chinese': '劍南路'})}>
							<rect x="305" y="125" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
							<text x="312" y="142" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="315" y="155" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="350" y="140" font-family="Microsoft YaHei" fill="black">劍南路</text>
							<text x="350" y="155" font-family="Montserrat, sans-serif" font-size="10" fill="black">Jiannan Rd.</text>
						</g>
						<g id='Xihu' font-size="15" onClick={() => handleClickOnStation({'english': 'Xihu', 'chinese': '西湖'})}>
							<rect x="380" y="42" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2"/>
							<text x="387" y="59" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="388" y="72" font-family="Montserrat, sans-serif" fill="black">16</text>
							<text x="368" y="20" font-family="Microsoft YaHei" fill="black">西湖</text>
							<text x="373" y="35" font-family="Montserrat, sans-serif" font-size="10" fill="black">Xihu</text>
						</g>
						<g id='Gangqian' font-size="15" onClick={() => handleClickOnStation({'english': 'Gangqian', 'chinese': '港墘'})}>
							<rect x="455" y="42" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2"/>
							<text x="462" y="59" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="463" y="72" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="435" y="20" font-family="Microsoft YaHei" fill="black">港墘</text>
							<text x="445" y="35" font-family="Montserrat, sans-serif" font-size="10" fill="black">Gangqian</text>
						</g>
						<g id='Wende' font-size="15" onClick={() => handleClickOnStation({'english': 'Wende', 'chinese': '文德'})}>
							<rect x="530" y="42" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2"/>
							<text x="537" y="59" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="538" y="72" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="526" y="20" font-family="Microsoft YaHei" fill="black">文德</text>
							<text x="535" y="35" font-family="Montserrat, sans-serif" font-size="10" fill="black">Wende</text>
						</g>
						<g id='Neihu' font-size="15" onClick={() => handleClickOnStation({'english': 'Neihu', 'chinese': '內湖'})}>
							<rect x="605" y="42" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2"/>
							<text x="612" y="59" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="613" y="72" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="608" y="20" font-family="Microsoft YaHei" fill="black">內湖</text>
							<text x="600" y="35" font-family="Montserrat, sans-serif" font-size="10" fill="black">Neihu</text>
						</g>
						<g id='Dahu Park' font-size="15" onClick={() => handleClickOnStation({'english': 'Dahu Park', 'chinese': '大湖公園'})}>
							<rect x="680" y="42" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2"/>
							<text x="687" y="59" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text x="689" y="72" font-family="Montserrat, sans-serif" fill="black">20</text>
							<text x="676" y="20" font-family="Microsoft YaHei" fill="black">大湖公園</text>
							<text x="672" y="35" font-family="Montserrat, sans-serif" font-size="10" fill="black">Dahu Park</text>
						</g>
*/
