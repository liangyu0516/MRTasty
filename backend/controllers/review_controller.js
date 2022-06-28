const Review = require('../models/review_model');

const getReviews = async (req, res) => {
	const { place_id } = req.params;
	let reviews = await Review.getReviews(place_id)
	res.status(200).json(reviews)
};

const addReview = async (req, res) => {
	const { place_id } = req.params;
	const {rate, comment} = req.body
	const userID = req.Uid
	let insertID = await Review.addReview(place_id, userID, rate, comment)
	res.status(200).json({insertID: insertID})
};

module.exports = {
	getReviews,
	addReview,
};