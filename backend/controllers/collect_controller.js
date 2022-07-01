const axios = require('axios');
const Collect = require('../models/collect_model');
const Restaurant = require('../models/restaurant_model');

const getCollect = async (req, res) => {
	const userID = req.Uid
	let getResult = await Collect.getCollect(userID)
	var collect = []
	for (let index = 0; index < getResult.length; index++) {
		let restaurantDetail = await Restaurant.getRestaurantDetail(getResult[index].Place_id)
		collect.push(restaurantDetail)
	}
	res.status(200).json(collect)
};

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

const deleteCollect = async (req, res) => {
	const userID = req.Uid
    const { place_id } = req.params
	let deleteResult = await Collect.deleteCollect(userID, place_id)
	res.status(200).json({status: deleteResult})
};

module.exports = {
	getCollect,
    checkCollect,
    addCollect,
    deleteCollect,
};