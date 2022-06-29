const axios = require('axios');
const Collect = require('../models/collect_model');

const addCollect = async (req, res) => {
	const userID = req.Uid
    const { place_id } = req.body
	let insertID = await Collect.addCollect(userID, place_id)
	res.status(200).json({insertID: insertID})
};

const checkCollect = async (req, res) => {
	const userID = req.Uid
    const { place_id } = req.params
	let isCollected = await Collect.checkCollect(userID, place_id)
	res.status(200).json({isCollected: isCollected})
};

const getRestaurantDetail = async (req, res) => {
	const { place_id } = req.params;

	let restaurantDetail = await Restaurant.getRestaurantDetail(place_id)

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY',
		headers: { }
	};
		  
	await axios(config)
	.then(function (response) {
		restaurantDetail['Phone'] = response.data.result.formatted_phone_number
		restaurantDetail['Website'] = response.data.result.website
		restaurantDetail['Address'] = response.data.result.formatted_address
		restaurantDetail['Opening_hours'] = response.data.result.opening_hours
		res.status(200).json(restaurantDetail)
	})
	 .catch(function (error) {
	 	// console.log(error);
		res.status(400).json(error)
	});
};

module.exports = {
	//getCollect,
    checkCollect,
    addCollect,
    //deleteCollect,
};