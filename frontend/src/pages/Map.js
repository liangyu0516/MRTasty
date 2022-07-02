/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import styled from 'styled-components'
import Swal from "sweetalert2";
const axios = require('axios');

const MapTitle = styled.div`
	margin: 2vh 0;
	letter-spacing: 0.5vw;
	color: black;
	font-family: Microsoft YaHei;
	font-size: 2.7vw;
	font-weight: 600;
`

const MapContainer = styled.div`
	width: 95vw;
	height: 77vh;
	border: 1px solid black;
	border-radius: 10px;
	overflow: scroll;
	&::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}
	&::-webkit-scrollbar
	{
		width: 0.7vw;
		height: 0.7vw;
	}
	&::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #336666;
	}
`

const RStation = styled.g`
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

const BRStation = styled.g`
	font-size: 15;
	cursor: pointer;
	&:hover #childRect {
		color: white;
		fill: #DB8F00;
	}
	&:hover #childText {
		fill: white;
	}
`

const GStation = styled.g`
	font-size: 15;
	cursor: pointer;
	&:hover #childRect {
		color: white;
		fill: green;
	}
	&:hover #childText {
		fill: white;
	}
`

function Map(props) {
  	const [color, setColor] = useState('white')

	async function handleClickOnStation (station) {
		if(props.type === '') {
			Swal.fire({
				icon: 'warning',
				title: '請先選擇地圖主題',
				text: '有四種主題可以選擇哦 :O',
			})
		}
		else {
			props.setIsSelected(true)
			props.setStation(station)
			await axios.get("http://localhost:3100/api/v1/restaurant?keyword=" + props.type + "&station=" + station.english)
			.then(function(response){
				console.log(response)
				props.setRestaurants(response.data)
			});
		}
	}

	return (
		<div style={ {'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'} }>
			<MapTitle>台北捷運{props.type}地圖</MapTitle>
			<MapContainer>
					<svg height="350vh" width="110vw" font-weight='600' >
						<path strokeLinejoin="round" strokeLinecap="round" fill='white' d="M168 70 L168 315 Q173,360 218,365 L550 365 Q595,370 600,415 L600 1367 L1120 1367" stroke="red" strokeWidth="10" />
						<path strokeLinejoin="round" strokeLinecap="round" fill='none' d="M450 1950 L450 1268 Q455,1223 500 1218 L1295 1218 Q1340,1213 1345,1168 L1345 980" stroke="blue" strokeWidth="10" />
						<path strokeLinejoin="round" strokeLinecap="round" fill='none' d="M1345 980 L1345 745 Q1340 700 1295 695 L950 695 Q905,700 900,745 L900 1470 Q905,1515 950,1518 L1075 1518 Q1120,1523 1125,1568 L1125 1693 Q1130,1738 1175,1743 L1350 1743" stroke="#DB8F00" strokeWidth="10" />
						<path strokeLinejoin="round" strokeLinecap="round" fill='none' d="M1135 1067 L575 1067 Q530,1072 525,1117 L525 1317 Q530,1362 575,1367 L600 1367 L908 1634 Q912,1641 914,1645 L915 1950" stroke="green" strokeWidth="10" />
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
						<RStation id='Dongmen' onClick={() => handleClickOnStation({'english': 'Dongmen', 'chinese': '東門'})}>
							<rect id='childRect' x="732" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="744" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="741" y="1381" font-family="Montserrat, sans-serif" fill="black">07</text>
							<text x="732" y="1403" font-family="Microsoft YaHei" fill="black">東門</text>
							<text x="720" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dongmen</text>
						</RStation>
						<RStation id='Daan Park' onClick={() => handleClickOnStation({'english': 'Daan Park', 'chinese': '大安森林公園'})}>
							<rect id='childRect' x="807" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="819" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="816" y="1381" font-family="Montserrat, sans-serif" fill="black">06</text>
							<text x="777" y="1403" font-family="Microsoft YaHei" fill="black">大安森林公園</text>
							<text x="795" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Daan Park</text>
						</RStation>
						<RStation id='Daan' onClick={() => handleClickOnStation({'english': 'Daan', 'chinese': '大安'})}>
							<rect id='childRect' x="882" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="894" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="891" y="1381" font-family="Montserrat, sans-serif" fill="black">05</text>
							<text x="890" y="1403" font-family="Microsoft YaHei" fill="black">大安</text>
							<text x="890" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Daan</text>
						</RStation>
						<RStation id='Xinyi Anhe' onClick={() => handleClickOnStation({'english': 'Xinyi Anhe', 'chinese': '信義安和'})}>
							<rect id='childRect' x="957" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="969" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="966" y="1381" font-family="Montserrat, sans-serif" fill="black">04</text>
							<text x="943" y="1403" font-family="Microsoft YaHei" fill="black">信義安和</text>
							<text x="944" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xinyi Anhe</text>
						</RStation>
						<RStation id='Taipei 101/World Trade Center' onClick={() => handleClickOnStation({'english': 'Taipei 101/World Trade Center', 'chinese': '台北101/世貿'})}>
							<rect id='childRect' x="1032" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="1044" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="1041" y="1381" font-family="Montserrat, sans-serif" fill="black">03</text>
							<text x="997" y="1315" font-family="Microsoft YaHei" fill="black">台北101/世貿</text>
							<text x="1020" y="1330" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei 101/</text>
							<text x="993" y="1340" font-family="Montserrat, sans-serif" font-size="12" fill="black">World Trade Center</text>
						</RStation>
						<RStation id='Xiangshan' onClick={() => handleClickOnStation({'english': 'Xiangshan', 'chinese': '象山'})}>
							<rect id='childRect' x="1107" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="red" strokeWidth="2" />
							<text id='childText' x="1119" y="1367" font-family="Montserrat, sans-serif" fill="black">R</text>
							<text id='childText' x="1116" y="1381" font-family="Montserrat, sans-serif" fill="black">02</text>
							<text x="1110" y="1403" font-family="Microsoft YaHei" fill="black">象山</text>
							<text x="1097" y="1418" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xiangshan</text>
						</RStation>
						<BLStation id='Dingpu' onClick={() => handleClickOnStation({'english': 'Dingpu', 'chinese': '頂埔'})}>
							<rect id='childRect' x="432" y="1950" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1967" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1981" font-family="Montserrat, sans-serif" fill="black">01</text>
							<text x="392" y="1966" font-family="Microsoft YaHei" fill="black">頂埔</text>
							<text x="383" y="1981" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dingpu</text>
						</BLStation>
						<BLStation id='Yongning' onClick={() => handleClickOnStation({'english': 'Yongning', 'chinese': '永寧'})}>
							<rect id='childRect' x="432" y="1875" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1892" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1906" font-family="Montserrat, sans-serif" fill="black">02</text>
							<text x="392" y="1891" font-family="Microsoft YaHei" fill="black">永寧</text>
							<text x="370" y="1906" font-family="Montserrat, sans-serif" font-size="12" fill="black">Yongning</text>
						</BLStation>
						<BLStation id='Tucheng' onClick={() => handleClickOnStation({'english': 'Tucheng', 'chinese': '土城'})}>
							<rect id='childRect' x="432" y="1800" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1817" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1831" font-family="Montserrat, sans-serif" fill="black">03</text>
							<text x="392" y="1816" font-family="Microsoft YaHei" fill="black">土城</text>
							<text x="376" y="1831" font-family="Montserrat, sans-serif" font-size="12" fill="black">Tucheng</text>
						</BLStation>
						<BLStation id='Haishan' onClick={() => handleClickOnStation({'english': 'Haishan', 'chinese': '海山'})}>
							<rect id='childRect' x="432" y="1725" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1742" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1756" font-family="Montserrat, sans-serif" fill="black">04</text>
							<text x="392" y="1741" font-family="Microsoft YaHei" fill="black">海山</text>
							<text x="377" y="1756" font-family="Montserrat, sans-serif" font-size="12" fill="black">Haishan</text>
						</BLStation>
						<BLStation id='Far Eastern Hospital' onClick={() => handleClickOnStation({'english': 'Far Eastern Hospital', 'chinese': '亞東醫院'})}>
							<rect id='childRect' x="432" y="1650" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1667" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1681" font-family="Montserrat, sans-serif" fill="black">05</text>
							<text x="360" y="1666" font-family="Microsoft YaHei" fill="black">亞東醫院</text>
							<text x="307" y="1681" font-family="Montserrat, sans-serif" font-size="12" fill="black">Far Eastern Hospital</text>
						</BLStation>
						<BLStation id='Fuzhong' onClick={() => handleClickOnStation({'english': 'Fuzhong', 'chinese': '府中'})}>
							<rect id='childRect' x="432" y="1575" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1592" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1606" font-family="Montserrat, sans-serif" fill="black">06</text>
							<text x="392" y="1591" font-family="Microsoft YaHei" fill="black">府中</text>
							<text x="374" y="1606" font-family="Montserrat, sans-serif" font-size="12" fill="black">Fuzhong</text>
						</BLStation>
						<BLStation id='Banqiao' onClick={() => handleClickOnStation({'english': 'Banqiao', 'chinese': '板橋'})}>
							<rect id='childRect' x="432" y="1500" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1517" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1531" font-family="Montserrat, sans-serif" fill="black">07</text>
							<text x="392" y="1516" font-family="Microsoft YaHei" fill="black">板橋</text>
							<text x="377" y="1531" font-family="Montserrat, sans-serif" font-size="12" fill="black">Banqiao</text>
						</BLStation>
						<BLStation id='Xinpu' onClick={() => handleClickOnStation({'english': 'Xinpu', 'chinese': '新埔'})}>
							<rect id='childRect' x="432" y="1425" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1442" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1456" font-family="Montserrat, sans-serif" fill="black">08</text>
							<text x="392" y="1441" font-family="Microsoft YaHei" fill="black">新埔</text>
							<text x="390" y="1456" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xinpu</text>
						</BLStation>
						<BLStation id='Jiangzicui' onClick={() => handleClickOnStation({'english': 'Jiangzicui', 'chinese': '江子翠'})}>
							<rect id='childRect' x="432" y="1350" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1367" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1381" font-family="Montserrat, sans-serif" fill="black">09</text>
							<text x="377" y="1366" font-family="Microsoft YaHei" fill="black">江子翠</text>
							<text x="366" y="1381" font-family="Montserrat, sans-serif" font-size="12" fill="black">Jiangzicui</text>
						</BLStation>
						<BLStation id='Longshan Temple' onClick={() => handleClickOnStation({'english': 'Longshan Temple', 'chinese': '龍山寺'})}>
							<rect id='childRect' x="432" y="1275" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="439" y="1292" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="441" y="1306" font-family="Montserrat, sans-serif" fill="black">10</text>
							<text x="377" y="1291" font-family="Microsoft YaHei" fill="black">龍山寺</text>
							<text x="367" y="1306" font-family="Montserrat, sans-serif" font-size="12" fill="black">Longshan</text>
							<text x="383" y="1316" font-family="Montserrat, sans-serif" font-size="12" fill="black">Temple</text>
						</BLStation>
						<BLStation id='Ximen' onClick={() => handleClickOnStation({'english': 'Ximen', 'chinese': '西門'})}>
							<rect id='childRect' x="507" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="514" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="516" y="1231" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="475" y="1180" font-family="Microsoft YaHei" fill="black">西門</text>
							<text x="471" y="1195" font-family="Montserrat, sans-serif" font-size="12" fill="black">Ximen</text>
						</BLStation>
						<BLStation id='Shandao Temple' onClick={() => handleClickOnStation({'english': 'Shandao Temple', 'chinese': '善導寺'})}>
							<rect id='childRect' x="657" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="664" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="666" y="1231" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="650" y="1253" font-family="Microsoft YaHei" fill="black">善導寺</text>
							<text x="625" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Shandao Temple</text>
						</BLStation>
						<BLStation id='Zhongxiao Xinsheng' onClick={() => handleClickOnStation({'english': 'Zhongxiao Xinsheng', 'chinese': '忠孝新生'})}>
							<rect id='childRect' x="732" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="739" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="741" y="1231" font-family="Montserrat, sans-serif" fill="black">14</text>
							<text x="773" y="1170" font-family="Microsoft YaHei" fill="black">忠孝新生</text>
							<text x="773" y="1185" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongxiao</text>
							<text x="773" y="1195" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xinsheng</text>
						</BLStation>
						<BLStation id='Zhongxiao Fuxing' onClick={() => handleClickOnStation({'english': 'Zhongxiao Fuxing', 'chinese': '忠孝復興'})}>
							<rect id='childRect' x="882" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="889" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="891" y="1231" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="923" y="1170" font-family="Microsoft YaHei" fill="black">忠孝復興</text>
							<text x="923" y="1185" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongxiao</text>
							<text x="923" y="1195" font-family="Montserrat, sans-serif" font-size="12" fill="black">Fuxing</text>
						</BLStation>
						<BLStation id='Zhongxiao Dunhua' onClick={() => handleClickOnStation({'english': 'Zhongxiao Fuxing', 'chinese': '忠孝敦化'})}>
							<rect id='childRect' x="957" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="964" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="966" y="1231" font-family="Montserrat, sans-serif" fill="black">16</text>
							<text x="943" y="1253" font-family="Microsoft YaHei" fill="black">忠孝敦化</text>
							<text x="945" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongxiao</text>
							<text x="953" y="1278" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dunhua</text>
						</BLStation>
						<BLStation id='Sun Yat-Sen Memorial Hall' onClick={() => handleClickOnStation({'english': 'Sun Yat-Sen Memorial Hall', 'chinese': '國父紀念館'})}>
							<rect id='childRect' x="1032" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1039" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1041" y="1231" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="1010" y="1253" font-family="Microsoft YaHei" fill="black">國父紀念館</text>
							<text x="1015" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Sun Yat-Sen</text>
							<text x="1012" y="1278" font-family="Montserrat, sans-serif" font-size="12" fill="black">Memorial Hall</text>
						</BLStation>
						<BLStation id='Taipei City Hall' onClick={() => handleClickOnStation({'english': 'Taipei City Hall', 'chinese': '市政府'})}>
							<rect id='childRect' x="1107" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1114" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1116" y="1231" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="1100" y="1253" font-family="Microsoft YaHei" fill="black">市政府</text>
							<text x="1107" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei</text>
							<text x="1100" y="1278" font-family="Montserrat, sans-serif" font-size="12" fill="black">City Hall</text>
						</BLStation>
						<BLStation id='Yongchun' onClick={() => handleClickOnStation({'english': 'Yongchun', 'chinese': '永春'})}>
							<rect id='childRect' x="1182" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1189" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1191" y="1231" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="1183" y="1253" font-family="Microsoft YaHei" fill="black">永春</text>
							<text x="1170" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Yongchun</text>
						</BLStation>
						<BLStation id='Houshanpi' onClick={() => handleClickOnStation({'english': 'Houshanpi', 'chinese': '後山埤'})}>
							<rect id='childRect' x="1257" y="1200" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1264" y="1217" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1266" y="1231" font-family="Montserrat, sans-serif" fill="black">20</text>
							<text x="1250" y="1253" font-family="Microsoft YaHei" fill="black">後山埤</text>
							<text x="1241" y="1268" font-family="Montserrat, sans-serif" font-size="12" fill="black">Houshanpi</text>
						</BLStation>
						<BLStation id='Kunyang' onClick={() => handleClickOnStation({'english': 'Kunyang', 'chinese': '昆陽'})}>
							<rect id='childRect' x="1327" y="1125" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1334" y="1142" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1336" y="1156" font-family="Montserrat, sans-serif" fill="black">21</text>
							<text x="1289" y="1141" font-family="Microsoft YaHei" fill="black">昆陽</text>
							<text x="1270" y="1156" font-family="Montserrat, sans-serif" font-size="12" fill="black">Kunyang</text>
						</BLStation>
						<BLStation id='Nangang' onClick={() => handleClickOnStation({'english': 'Nangang', 'chinese': '南港'})}>
							<rect id='childRect' x="1327" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1334" y="1067" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1336" y="1081" font-family="Montserrat, sans-serif" fill="black">22</text>
							<text x="1289" y="1066" font-family="Microsoft YaHei" fill="black">南港</text>
							<text x="1270" y="1081" font-family="Montserrat, sans-serif" font-size="12" fill="black">Nangang</text>
						</BLStation>
						<BLStation id='Taipei Nangang Exhibition Center' onClick={() => handleClickOnStation({'english': 'Taipei Nangang Exhibition Center', 'chinese': '南港展覽館'})}>
							<rect id='childRect' x="1327" y="975" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
							<text id='childText' x="1334" y="992" font-family="Montserrat, sans-serif" fill="black">BL</text>
							<text id='childText' x="1336" y="1006" font-family="Montserrat, sans-serif" fill="black">23</text>
							<text x="1240" y="991" font-family="Microsoft YaHei" fill="black">南港展覽館</text>
							<text x="1232" y="1006" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei Nangang</text>
							<text x="1221" y="1016" font-family="Montserrat, sans-serif" font-size="12" fill="black">Exhibition Center</text>
						</BLStation>
						<BRStation id='Nangang Software Park' onClick={() => handleClickOnStation({'english': 'Nangang Software Park', 'chinese': '南港軟體園區'})}>
							<rect id='childRect' x="1327" y="900" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1333" y="917" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1336" y="931" font-family="Montserrat, sans-serif" fill="black">23</text>
							<text x="1225" y="916" font-family="Microsoft YaHei" fill="black">南港軟體園區</text>
							<text x="1187" y="931" font-family="Montserrat, sans-serif" font-size="12" fill="black">Nangang Software Park</text>
						</BRStation>
						<BRStation id='Donghu' onClick={() => handleClickOnStation({'english': 'Donghu', 'chinese': '東湖'})}>
							<rect id='childRect' x="1327" y="825" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1333" y="842" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1336" y="856" font-family="Montserrat, sans-serif" fill="black">22</text>
							<text x="1289" y="841" font-family="Microsoft YaHei" fill="black">東湖</text>
							<text x="1276" y="856" font-family="Montserrat, sans-serif" font-size="12" fill="black">Donghu</text>
						</BRStation>
						<BRStation id='Huzhou' onClick={() => handleClickOnStation({'english': 'Huzhou', 'chinese': '葫洲'})}>
							<rect id='childRect' x="1327" y="750" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1333" y="767" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1336" y="781" font-family="Montserrat, sans-serif" fill="black">21</text>
							<text x="1289" y="766" font-family="Microsoft YaHei" fill="black">葫洲</text>
							<text x="1276" y="781" font-family="Montserrat, sans-serif" font-size="12" fill="black">Huzhou</text>
						</BRStation>
						<BRStation id='Dahu Park' onClick={() => handleClickOnStation({'english': 'Dahu Park', 'chinese': '大湖公園'})}>
							<rect id='childRect' x="1257" y="677" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1264" y="694" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1266" y="708" font-family="Montserrat, sans-serif" fill="black">20</text>
							<text x="1242" y="657" font-family="Microsoft YaHei" fill="black">大湖公園</text>
							<text x="1245" y="672" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dahu Park</text>
						</BRStation>
						<BRStation id='Neihu' onClick={() => handleClickOnStation({'english': 'Neihu', 'chinese': '內湖'})}>
							<rect id='childRect' x="1182" y="677" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1189" y="694" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1191" y="708" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="1183" y="657" font-family="Microsoft YaHei" fill="black">內湖</text>
							<text x="1183" y="672" font-family="Montserrat, sans-serif" font-size="12" fill="black">Neihu</text>
						</BRStation>
						<BRStation id='Wende' onClick={() => handleClickOnStation({'english': 'Wende', 'chinese': '文德'})}>
							<rect id='childRect' x="1107" y="677" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1114" y="694" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1116" y="708" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="1106" y="657" font-family="Microsoft YaHei" fill="black">文德</text>
							<text x="1104" y="672" font-family="Montserrat, sans-serif" font-size="12" fill="black">Wende</text>
						</BRStation>
						<BRStation id='Gangqian' onClick={() => handleClickOnStation({'english': 'Gangqian', 'chinese': '港墘'})}>
							<rect id='childRect' x="1032" y="677" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1039" y="694" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1041" y="708" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="1031" y="657" font-family="Microsoft YaHei" fill="black">港墘</text>
							<text x="1020" y="672" font-family="Montserrat, sans-serif" font-size="12" fill="black">Gangqian</text>
						</BRStation>
						<BRStation id='Xihu' onClick={() => handleClickOnStation({'english': 'Xihu', 'chinese': '西湖'})}>
							<rect id='childRect' x="957" y="677" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="964" y="694" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="966" y="708" font-family="Montserrat, sans-serif" fill="black">16</text>
							<text x="958" y="657" font-family="Microsoft YaHei" fill="black">西湖</text>
							<text x="961" y="672" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xihu</text>
						</BRStation>
						<BRStation id='Jiannan Rd.' onClick={() => handleClickOnStation({'english': 'Jiannan Rd.', 'chinese': '劍南路'})}>
							<rect id='childRect' x="882" y="750" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="767" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="781" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="923" y="766" font-family="Microsoft YaHei" fill="black">劍南路</text>
							<text x="923" y="781" font-family="Montserrat, sans-serif" font-size="12" fill="black">Jiannan Rd.</text>
						</BRStation>
						<BRStation id='Dazhi' onClick={() => handleClickOnStation({'english': 'Dazhi', 'chinese': '大直'})}>
							<rect id='childRect' x="882" y="825" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="842" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="856" font-family="Montserrat, sans-serif" fill="black">14</text>
							<text x="923" y="841" font-family="Microsoft YaHei" fill="black">大直</text>
							<text x="923" y="856" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dazhi</text>
						</BRStation>
						<BRStation id='Songshan Airport' onClick={() => handleClickOnStation({'english': 'Songshan Airport', 'chinese': '松山機場'})}>
							<rect id='childRect' x="882" y="900" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="917" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="931" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="923" y="916" font-family="Microsoft YaHei" fill="black">松山機場</text>
							<text x="923" y="931" font-family="Montserrat, sans-serif" font-size="12" fill="black">Songshan Airport</text>
						</BRStation>
						<BRStation id='Zhongshan Junior High School' onClick={() => handleClickOnStation({'english': 'Zhongshan Junior High School', 'chinese': '中山國中'})}>
							<rect id='childRect' x="882" y="975" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="992" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="1006" font-family="Montserrat, sans-serif" fill="black">12</text>
							<text x="923" y="991" font-family="Microsoft YaHei" fill="black">中山國中</text>
							<text x="923" y="1006" font-family="Montserrat, sans-serif" font-size="12" fill="black">Zhongshan</text>
							<text x="923" y="1016" font-family="Montserrat, sans-serif" font-size="12" fill="black">Junior High School</text>
						</BRStation>
						<BRStation id='Nanjing Fuxing' onClick={() => handleClickOnStation({'english': 'Nanjing Fuxing', 'chinese': '南京復興'})}>
							<rect id='childRect' x="882" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="1067" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="1081" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="923" y="1066" font-family="Microsoft YaHei" fill="black">南京復興</text>
							<text x="923" y="1081" font-family="Montserrat, sans-serif" font-size="12" fill="black">Nanjing Fuxing</text>
						</BRStation>
						<BRStation id='Technology Building' onClick={() => handleClickOnStation({'english': 'Technology Building', 'chinese': '科技大樓'})}>
							<rect id='childRect' x="882" y="1425" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="889" y="1442" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="891" y="1456" font-family="Montserrat, sans-serif" fill="black">08</text>
							<text x="923" y="1441" font-family="Microsoft YaHei" fill="black">科技大樓</text>
							<text x="923" y="1456" font-family="Montserrat, sans-serif" font-size="12" fill="black">Technology</text>
							<text x="923" y="1466" font-family="Montserrat, sans-serif" font-size="12" fill="black">Building</text>
						</BRStation>
						<BRStation id='Liuzhangli' onClick={() => handleClickOnStation({'english': 'Liuzhangli', 'chinese': '六張犁'})}>
							<rect id='childRect' x="957" y="1500" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="964" y="1517" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="966" y="1531" font-family="Montserrat, sans-serif" fill="black">07</text>
							<text x="951" y="1553" font-family="Microsoft YaHei" fill="black">六張犁</text>
							<text x="946" y="1568" font-family="Montserrat, sans-serif" font-size="12" fill="black">Liuzhangli</text>
						</BRStation>
						<BRStation id='Linguang' onClick={() => handleClickOnStation({'english': 'Linguang', 'chinese': '麟光'})}>
							<rect id='childRect' x="1032" y="1500" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1039" y="1517" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1041" y="1531" font-family="Montserrat, sans-serif" fill="black">06</text>
							<text x="1035" y="1553" font-family="Microsoft YaHei" fill="black">麟光</text>
							<text x="1025" y="1568" font-family="Montserrat, sans-serif" font-size="12" fill="black">Linguang</text>
						</BRStation>
						<BRStation id='Xinhai' onClick={() => handleClickOnStation({'english': 'Xinhai', 'chinese': '辛亥'})}>
							<rect id='childRect' x="1107" y="1575" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1114" y="1591" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1116" y="1606" font-family="Montserrat, sans-serif" fill="black">05</text>
							<text x="1147" y="1589" font-family="Microsoft YaHei" fill="black">辛亥</text>
							<text x="1147" y="1604" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xinhai</text>
						</BRStation>
						<BRStation id='Wanfang Hospital' onClick={() => handleClickOnStation({'english': 'Wanfang Hospital', 'chinese': '萬芳醫院'})}>
							<rect id='childRect' x="1107" y="1650" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1114" y="1667" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1116" y="1681" font-family="Montserrat, sans-serif" fill="black">04</text>
							<text x="1147" y="1664" font-family="Microsoft YaHei" fill="black">萬芳醫院</text>
							<text x="1147" y="1679" font-family="Montserrat, sans-serif" font-size="12" fill="black">Wanfang Hospital</text>
						</BRStation>
						<BRStation id='Wanfang Community' onClick={() => handleClickOnStation({'english': 'Wanfang Community', 'chinese': '萬芳社區'})}>
							<rect id='childRect' x="1182" y="1725" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1188" y="1742" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1191" y="1756" font-family="Montserrat, sans-serif" fill="black">03</text>
							<text x="1169" y="1778" font-family="Microsoft YaHei" fill="black">萬芳社區</text>
							<text x="1176" y="1793" font-family="Montserrat, sans-serif" font-size="12" fill="black">Wanfang</text>
							<text x="1169" y="1803" font-family="Montserrat, sans-serif" font-size="12" fill="black">Community</text>
						</BRStation>
						<BRStation id='Muzha' onClick={() => handleClickOnStation({'english': 'Muzha', 'chinese': '木柵'})}>
							<rect id='childRect' x="1257" y="1725" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1263" y="1742" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1266" y="1756" font-family="Montserrat, sans-serif" fill="black">02</text>
							<text x="1258" y="1778" font-family="Microsoft YaHei" fill="black">木柵</text>
							<text x="1256" y="1793" font-family="Montserrat, sans-serif" font-size="12" fill="black">Muzha</text>
						</BRStation>
						<BRStation id='Taipei Zoo' onClick={() => handleClickOnStation({'english': 'Taipei Zoo', 'chinese': '動物園'})}>
							<rect id='childRect' x="1332" y="1725" rx="5" ry="5" width="35" height="35" fill={color} stroke="#DB8F00" strokeWidth="2" />
							<text id='childText' x="1338" y="1742" font-family="Montserrat, sans-serif" fill="black">BR</text>
							<text id='childText' x="1341" y="1756" font-family="Montserrat, sans-serif" fill="black">01</text>
							<text x="1328" y="1778" font-family="Microsoft YaHei" fill="black">動物園</text>
							<text x="1322" y="1793" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei Zoo</text>
						</BRStation>
						<GStation id='Songshan' onClick={() => handleClickOnStation({'english': 'Songshan', 'chinese': '松山'})}>
							<rect id='childRect' x="1107" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="1118" y="1067" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="1116" y="1081" font-family="Montserrat, sans-serif" fill="black">19</text>
							<text x="1110" y="1103" font-family="Microsoft YaHei" fill="black">松山</text>
							<text x="1099" y="1118" font-family="Montserrat, sans-serif" font-size="12" fill="black">Songshan</text>
						</GStation>
						<GStation id='Nanjing Sanmin' onClick={() => handleClickOnStation({'english': 'Nanjing Sanmin', 'chinese': '南京三民'})}>
							<rect id='childRect' x="1032" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="1043" y="1067" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="1041" y="1081" font-family="Montserrat, sans-serif" fill="black">18</text>
							<text x="1018" y="1103" font-family="Microsoft YaHei" fill="black">南京三民</text>
							<text x="1030" y="1118" font-family="Montserrat, sans-serif" font-size="12" fill="black">Nanjing</text>
							<text x="1030" y="1128" font-family="Montserrat, sans-serif" font-size="12" fill="black">Sanmin</text>
						</GStation>
						<GStation id='Taipei Arena' onClick={() => handleClickOnStation({'english': 'Taipei Arena', 'chinese': '台北小巨蛋'})}>
							<rect id='childRect' x="957" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="968" y="1067" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="966" y="1081" font-family="Montserrat, sans-serif" fill="black">17</text>
							<text x="934" y="1103" font-family="Microsoft YaHei" fill="black">台北小巨蛋</text>
							<text x="939" y="1118" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipei Arena</text>
						</GStation>
						<GStation id='Songjiang Nanjing' onClick={() => handleClickOnStation({'english': 'Songjiang Nanjing', 'chinese': '松江南京'})}>
							<rect id='childRect' x="732" y="1050" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="743" y="1067" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="741" y="1081" font-family="Montserrat, sans-serif" fill="black">15</text>
							<text x="773" y="1020" font-family="Microsoft YaHei" fill="black">松江南京</text>
							<text x="773" y="1035" font-family="Montserrat, sans-serif" font-size="12" fill="black">Songjiang</text>
							<text x="773" y="1045" font-family="Montserrat, sans-serif" font-size="12" fill="black">Nanjing</text>
						</GStation>
						<GStation id='Beimen' onClick={() => handleClickOnStation({'english': 'Beimen', 'chinese': '北門'})}>
							<rect id='childRect' x="507" y="1125" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="518" y="1142" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="516" y="1156" font-family="Montserrat, sans-serif" fill="black">13</text>
							<text x="468" y="1141" font-family="Microsoft YaHei" fill="black">北門</text>
							<text x="456" y="1156" font-family="Montserrat, sans-serif" font-size="12" fill="black">Beimen</text>
						</GStation>
						<GStation id='Xiaonanmen' onClick={() => handleClickOnStation({'english': 'Xiaonanmen', 'chinese': '小南門'})}>
							<rect id='childRect' x="507" y="1275" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="518" y="1292" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="516" y="1306" font-family="Montserrat, sans-serif" fill="black">11</text>
							<text x="468" y="1328" font-family="Microsoft YaHei" fill="black">小南門</text>
							<text x="456" y="1343" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xiaonanmen</text>
						</GStation>
						<GStation id='Guting' onClick={() => handleClickOnStation({'english': 'Guting', 'chinese': '古亭'})}>
							<rect id='childRect' x="657" y="1415" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="668" y="1432" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="666" y="1446" font-family="Montserrat, sans-serif" fill="black">09</text>
							<text x="610" y="1435" font-family="Microsoft YaHei" fill="black">古亭</text>
							<text x="610" y="1450" font-family="Montserrat, sans-serif" font-size="12" fill="black">Guting</text>
						</GStation>
						<GStation id='Taipower Building' onClick={() => handleClickOnStation({'english': 'Taipower Building', 'chinese': '台電大樓'})}>
							<rect id='childRect' x="722" y="1469" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="733" y="1486" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="731" y="1500" font-family="Montserrat, sans-serif" fill="black">08</text>
							<text x="650" y="1490" font-family="Microsoft YaHei" fill="black">台電大樓</text>
							<text x="610" y="1505" font-family="Montserrat, sans-serif" font-size="12" fill="black">Taipower Building</text>
						</GStation>
						<GStation id='Gongguan' onClick={() => handleClickOnStation({'english': 'Gongguan', 'chinese': '公館'})}>
							<rect id='childRect' x="787" y="1526" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="798" y="1543" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="796" y="1557" font-family="Montserrat, sans-serif" fill="black">07</text>
							<text x="745" y="1547" font-family="Microsoft YaHei" fill="black">公館</text>
							<text x="718" y="1562" font-family="Montserrat, sans-serif" font-size="12" fill="black">Gongguan</text>
						</GStation>
						<GStation id='Wanlong' onClick={() => handleClickOnStation({'english': 'Wanlong', 'chinese': '萬隆'})}>
							<rect id='childRect' x="852" y="1583" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="863" y="1600" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="861" y="1614" font-family="Montserrat, sans-serif" fill="black">06</text>
							<text x="807" y="1604" font-family="Microsoft YaHei" fill="black">萬隆</text>
							<text x="790" y="1619" font-family="Montserrat, sans-serif" font-size="12" fill="black">Wanlong</text>
						</GStation>
						<GStation id='Jingmei' onClick={() => handleClickOnStation({'english': 'Jingmei', 'chinese': '景美'})}>
							<rect id='childRect' x="897" y="1650" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="908" y="1667" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="906" y="1681" font-family="Montserrat, sans-serif" fill="black">05</text>
							<text x="937" y="1664" font-family="Microsoft YaHei" fill="black">景美</text>
							<text x="937" y="1679" font-family="Montserrat, sans-serif" font-size="12" fill="black">Jingmei</text>
						</GStation>
						<GStation id='Dapinglin' onClick={() => handleClickOnStation({'english': 'Dapinglin', 'chinese': '大坪林'})}>
							<rect id='childRect' x="897" y="1725" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="908" y="1742" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="906" y="1756" font-family="Montserrat, sans-serif" fill="black">04</text>
							<text x="937" y="1739" font-family="Microsoft YaHei" fill="black">大坪林</text>
							<text x="937" y="1754" font-family="Montserrat, sans-serif" font-size="12" fill="black">Dapinglin</text>
						</GStation>
						<GStation id='Qizhang' onClick={() => handleClickOnStation({'english': 'Qizhang', 'chinese': '七張'})}>
							<rect id='childRect' x="897" y="1800" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="908" y="1817" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="906" y="1831" font-family="Montserrat, sans-serif" fill="black">03</text>
							<text x="937" y="1814" font-family="Microsoft YaHei" fill="black">七張</text>
							<text x="937" y="1829" font-family="Montserrat, sans-serif" font-size="12" fill="black">Qizhang</text>
						</GStation>
						<GStation id='Xindian District Office' onClick={() => handleClickOnStation({'english': 'Xindian District Office', 'chinese': '新店區公所'})}>
							<rect id='childRect' x="897" y="1875" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="908" y="1892" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="906" y="1906" font-family="Montserrat, sans-serif" fill="black">02</text>
							<text x="937" y="1889" font-family="Microsoft YaHei" fill="black">新店區公所</text>
							<text x="937" y="1904" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xindian District Office</text>
						</GStation>
						<GStation id='Xindian' onClick={() => handleClickOnStation({'english': 'Xindian', 'chinese': '新店'})}>
							<rect id='childRect' x="897" y="1950" rx="5" ry="5" width="35" height="35" fill={color} stroke="green" strokeWidth="2" />
							<text id='childText' x="908" y="1967" font-family="Montserrat, sans-serif" fill="black">G</text>
							<text id='childText' x="906" y="1981" font-family="Montserrat, sans-serif" fill="black">01</text>
							<text x="937" y="1964" font-family="Microsoft YaHei" fill="black">新店</text>
							<text x="937" y="1979" font-family="Montserrat, sans-serif" font-size="12" fill="black">Xindian</text>
						</GStation>
					</svg>
			</MapContainer>
		</div>
	);
}

export default Map;

/*
<path strokeLinejoin="round" strokeLinecap="round" fill='white' d="M323 600 L323 110 Q328,65 373,60 L 720 60 Q765,65 770,110 L770 360" stroke="#b8860b" strokeWidth="10" />
						<path strokeLinejoin="round" strokeLinecap="round" d="M5 600 L720 600 Q765,595 770,550 L770 360" fill='none' stroke="#0000ff" strokeWidth="10" />
						
*/
