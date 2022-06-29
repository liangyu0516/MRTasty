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

const deleteCollect = async (req, res) => {
	const userID = req.Uid
    const { place_id } = req.params
	let deleteResult = await Collect.deleteCollect(userID, place_id)
	res.status(200).json({status: deleteResult})
};

module.exports = {
	//getCollect,
    checkCollect,
    addCollect,
    deleteCollect,
};