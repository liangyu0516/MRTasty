import { createPortal } from "react-dom";
import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";
import star from '../images/star.png'
import foot from '../images/foot.png'

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
	margin-top: 5vw;
	margin-bottom: 5vw;
	padding: 1vw 2vw;
	font-size: 2.7vw;
	font-weight: 900;
	color: white;
	border-radius: 15px;
	background-color: red;
	box-shadow: 10px 5px 5px black;
`

const Restaurants = styled.a`
	width: 50vw;
	height: 60vh;
	display: flex;
	font-family: Microsoft YaHei;
	flex-direction: column;
	align-items: center;
	overflow: scroll;
`

const Restaurant = styled.div`
	margin-bottom: 2vh;
	padding: 3vh;
	width: 35vw;
	display: flex;
	flex-direction: row;
	border-radius: 2vw;
	border: 2px solid black;
	box-shadow: 1px 10px 1px black;
	background-color: #FFFFCC;
`

const MainImg = styled.img`
	width: 7vw;
	height: 7vw;
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
	font-size: 1.5vw;
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
		return createPortal (
			<StyledModal onClick={() => this.props.setIsSelected(false)}>
				<Station>
					{this.props.station.chinese}
				</Station>
				<Restaurants>
					{this.props.restaurants?.map((restaurant) => (
						<Link to={'/restaurant/' + restaurant.Place_id} style={{ textDecoration: 'none', color: 'black' }}>
							<Restaurant key={restaurant.name} >
								<MainImg src={restaurant.Photo_reference !== undefined ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=' + restaurant.Photo_reference + '&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY':''}/>
								<Info>
									<Name>
										{restaurant.Name}
									</Name>
									<Stars>
										{new Array(restaurant.Rating).fill(null).map(() => (
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