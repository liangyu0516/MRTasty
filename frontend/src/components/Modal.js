import { createPortal } from "react-dom";
import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";
import star from '../images/star.png'
import foot from '../images/foot.png'
import restaurantImg from '../images/restaurant.png'

const StyledModal = styled.div`
	background-color: rgba(0,0,0,0.5);
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Station = styled.div`
	margin: 2.5vw 0;
	padding: 1vw 2vw;
	font-size: 2.7vw;
	font-weight: 900;
	color: white;
	border-radius: 15px;
	background-color: #336666;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const Restaurants = styled.a`
	width: 50vw;
	height: 67vh;
	display: flex;
	font-family: Microsoft YaHei;
	flex-direction: column;
	align-items: center;
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

const Restaurant = styled.div`
	margin-bottom: 2vh;
	padding: 3vh;
	width: 30vw;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
`

const Nothing = styled.div`
	margin-bottom: 2vh;
	padding: 3vh;
	width: 30vw;
	text-align: center;
	border-radius: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background-color: white;
`

const MainImg = styled.img`
	width: 7vw;
	height: 7vw;
	overflow: hidden;
`

const Info = styled.div`
	margin-left: 1vw;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`
const Name = styled.div`
	margin-bottom: 1vh;
	font-size: 1.3vw;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Stars = styled.div`
	display: flex;
	flex-direction: row;
`

const StarImg = styled.img`
	margin-bottom: 1vh;
	width: 1.1vw;
	height: 1.1vw;
`

const Distance = styled.div`
	display: flex;
	flex-direction: row;
`

const FootImg = styled.img`
	margin-right: 0.3vw;
	width: 1.1vw;
	height: 1.1vw;
`

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	  }
	
	  componentDidMount() {
		modalRoot.appendChild(this.el);
	  }
	
	  componentWillUnmount() {
		modalRoot.removeChild(this.el);
	  }
	  
	render() {
		if(this.props.restaurants?.length === 0) {
			return createPortal (
				<StyledModal onClick={() => this.props.setIsSelected(false)}>
					<Station>
						{this.props.station.chinese}
					</Station>
					<Nothing>這附近沒有你要的餐廳哦...</Nothing>
				</StyledModal>
			, this.el,
			);
		}

		return createPortal (
			<StyledModal onClick={() => this.props.setIsSelected(false)}>
				<Station>
					{this.props.station.chinese}
				</Station>
				<Restaurants>
					{this.props.restaurants?.map((restaurant) => (
						<Link to={'/restaurant/' + restaurant.Place_id} style={{ textDecoration: 'none', color: 'black' }}>
							<Restaurant key={restaurant.name} >
								<MainImg src={restaurant.Photo_reference !== null ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=' + restaurant.Photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY':restaurantImg }/>
								<Info>
									<Name>
										{restaurant.Name}
									</Name>
									<Stars>
										{new Array(Math.round(restaurant.Rating)).fill(null).map(() => (
											<StarImg src={star} />
										))}
									</Stars>
									<Distance>
										<FootImg src={foot} />
										<div>{restaurant.Distance} 公尺</div>
									</Distance>
								</Info>
							</Restaurant>
						</Link>
					))}
				</Restaurants>
			</StyledModal>
			, this.el,
		);
	}
}

export default Modal;