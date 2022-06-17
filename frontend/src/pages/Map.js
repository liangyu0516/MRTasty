/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import styled from 'styled-components'
const axios = require('axios');

const Restaurants = styled.div`
	width: 25vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: pink;
`

const Restaurant = styled.div`
	margin-bottom: 10px;
	padding: 2vh;
	width: 18vw;
	border-radius: 25px;
	border: 8px solid blue;
	display: flex;
	flex-direction: row;
`

const MainImg = styled.img`
	width: 7vw;
	height: 7vw;
	border: 2px solid black;
`

const Info = styled.div`
	width: 5px;
	text-align: left;
	background-color: white;
	border: 2px solid black;
`

function Map() {
  	const [color, setColor] = useState('white')
  	const [restaurants, setRestaurants] = useState([])

	async function getRestuarantMainImg (photo_reference) {
		var img = null
		if (photo_reference !== undefined) {
			await axios.get("http://localhost:3100/api/v1/restaurant/photo/" + photo_reference)
			// console.log(img)
			// return await axios.get("http://localhost:3100/api/v1/restaurant/photo/" + photo_reference).data
		}
	}

	async function handleClickOnStation (station) {
		await axios.get("http://localhost:3100/api/v1/restaurant/" + station)
		.then(function(response){
			console.log(response)
			setRestaurants(response.data.results)
		});
	}

	return (
		<div style={ {'backgroundColor': 'yellow', 'display': 'flex', 'flex-direction': 'row'} }>
			<div style={ {'width': '10vw', 'background-color': 'gray'} }/>
			<svg height="200vh" width="65vw" font-weight='600'>
				<path strokeLinejoin="round" strokeLinecap="round" d="M323 600 L323 10" stroke="#b8860b" strokeWidth="10" />
				<path strokeLinejoin="round" strokeLinecap="round" d="M5 600 L720 600 Q765,595 770,550 L770 10" fill='none' stroke="#0000ff" strokeWidth="10" />
				<g id='Ximen' font-size="15" onClick={() => handleClickOnStation('Ximen')}>
					<rect x="5" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" />
					<text x="12" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="14" y="613" font-family="Montserrat, sans-serif" fill="black">11</text>
					<text x="8" y="635" font-family="Microsoft YaHei" fill="black">西門</text>
					<text x="8" y="648" font-family="Montserrat, sans-serif" font-size="10" fill="black">Ximen</text>
				</g>
				<g id='Taipei Main Station' font-size="15" onClick={() => handleClickOnStation('Taipei Main Station')}>
					<rect x="80" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="87" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="89" y="613" font-family="Montserrat, sans-serif" fill="black">12</text>
					<text x="70" y="635" font-family="Microsoft YaHei" fill="black">台北車站</text>
					<text x="73" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Taipei Main</text>
					<text x="84" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Station</text>
				</g>
				<g id='Shandao Temple' font-size="15" onClick={() => handleClickOnStation('Shandao Temple')}>
					<rect x="155" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="163" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="164" y="613" font-family="Montserrat, sans-serif" fill="black">13</text>
					<text x="150" y="635" font-family="Microsoft YaHei"  fill="black">善導寺</text>
					<text x="152" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Shandao</text>
					<text x="155" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Temple</text>
				</g>
				<g id='Zhongxiao Xinsheng' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Xinsheng')}>
					<rect x="230" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="237" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="238" y="613" font-family="Montserrat, sans-serif" fill="black">14</text>
					<text x="218" y="635" font-family="Microsoft YaHei" fill="black">忠孝新生</text>
					<text x="223" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
					<text x="227" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Xinsheng</text>
				</g>
				<g id='Zhongxiao Fuxing' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Fuxing')}>
					<rect x="305" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="312" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="313" y="613" font-family="Montserrat, sans-serif" fill="black">15</text>
					<text x="292" y="635" font-family="Microsoft YaHei" fill="black">忠孝復興</text>
					<text x="297" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
					<text x="307" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Fuxing</text>
				</g>
				<g id='Zhongxiao Dunhua' font-size="15" onClick={() => handleClickOnStation('Zhongxiao Dunhua')}>
					<rect x="380" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="387" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="388" y="613" font-family="Montserrat, sans-serif" fill="black">16</text>
					<text x="368" y="635" font-family="Microsoft YaHei" fill="black">忠孝敦化</text>
					<text x="373" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Zhongxiao</text>
					<text x="381" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Dunhua</text>
				</g>
				<g id='Sun Yat-Sen Memorial Hall' font-size="15" onClick={() => handleClickOnStation('Sun Yat-Sen Memorial Hall')}>
					<rect x="455" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="462" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="463" y="613" font-family="Montserrat, sans-serif" fill="black">17</text>
					<text x="435" y="635" font-family="Microsoft YaHei" fill="black">國父紀念館</text>
					<text x="445" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Sun Yat-Sen</text>
					<text x="442" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">Memorial Hall</text>
				</g>
				<g id='Taipei City Hall' font-size="15" onClick={() => handleClickOnStation('Taipei City Hall')}>
					<rect x="530" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="537" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="538" y="613" font-family="Montserrat, sans-serif" fill="black">18</text>
					<text x="526" y="635" font-family="Microsoft YaHei" fill="black">市政府</text>
					<text x="535" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Taipei</text>
					<text x="528" y="660" font-family="Montserrat, sans-serif" font-size="10" fill="black">City Hall</text>
				</g>
				<g id='Yongchun' font-size="15" onClick={() => handleClickOnStation('Yongchun')}>
					<rect x="605" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="612" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="613" y="613" font-family="Montserrat, sans-serif" fill="black">19</text>
					<text x="608" y="635" font-family="Microsoft YaHei" fill="black">永春</text>
					<text x="600" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Yongchun</text>
				</g>
				<g id='Houshanpi' font-size="15" onClick={() => handleClickOnStation('Houshanpi')}>
					<rect x="680" y="583" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
					<text x="687" y="600" font-family="Montserrat, sans-serif" fill="black">BL</text>
					<text x="689" y="613" font-family="Montserrat, sans-serif" fill="black">20</text>
					<text x="676" y="635" font-family="Microsoft YaHei" fill="black">後山埤</text>
					<text x="674" y="650" font-family="Montserrat, sans-serif" font-size="10" fill="black">Houshanpi</text>
				</g>
				<g id='Kunyang' font-size="15" onClick={() => handleClickOnStation('Kunyang')}>
					<rect x="753" y="500" rx="5" ry="5" width="35" height="35" fill={color} stroke="blue" strokeWidth="2" onClick={() => setColor('green')}/>
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
				<g id='Songshan Airport' font-size="15" onClick={() => handleClickOnStation('Songshan Airport')}>
					<rect x="305" y="275" rx="5" ry="5" width="35" height="35" fill={color} stroke="#b8860b" strokeWidth="2" />
					<text x="312" y="292" font-family="Montserrat, sans-serif" fill="black">BR</text>
					<text x="315" y="305" font-family="Montserrat, sans-serif" fill="black">13</text>
					<text x="350" y="290" font-family="Microsoft YaHei" fill="black">松山機場</text>
					<text x="350" y="305" font-family="Montserrat, sans-serif" font-size="10" fill="black">Songshan Airport</text>
				</g>
			</svg>
			<Restaurants>
				{restaurants.map((restaurant) => (
					<Restaurant key={restaurant.name}>
						<MainImg scr={getRestuarantMainImg(restaurant.photos === undefined ? '':restaurant.photos[0].photo_reference)} />
						<Info>
							<div>{restaurant.name}</div>
							<div>評分：{restaurant.rating}</div>
							<div>評分數：{restaurant.photos === undefined ? '':restaurant.photos[0].photo_reference}</div>
						</Info>
					</Restaurant>
				))}
			</Restaurants>
		</div>
	);
}

export default Map;
