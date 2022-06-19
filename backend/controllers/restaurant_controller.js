const axios = require('axios');
const jsSHA = require('jssha');
const Station = require('../models/station_model');

const getRestaurantsNearStation = async (req, res) => {
	const { keyword, station } = req.query;
	let [latitude, longtitude] = await Station.getStationPosition(station)

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longtitude + '&radius=500&keyword=' + encodeURIComponent(keyword) + '&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY',
		headers: { }
	};
		  
	await axios(config)
	.then(function (response) {
		res.status(200).json(response.data)
	})
	 .catch(function (error) {
	 	// console.log(error);
		res.status(400).json(error)
	});
};

const getRestaurantDetail = async (req, res) => {
	const { place_id } = req.params;

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY',
		headers: { }
	};
		  
	await axios(config)
	.then(function (response) {
		res.status(200).json(response.data)
	})
	 .catch(function (error) {
	 	// console.log(error);
		res.status(400).json(error)
	});
};

module.exports = {
	getRestaurantsNearStation,
	getRestaurantDetail,
};