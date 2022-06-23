const Review = require('../models/review_model');

const getReviews = async (req, res) => {
	const { place_id } = req.params;
	let reviews = await Review.getReviews(place_id)
	res.status(200).json(reviews)
};

module.exports = {
	getReviews,
};