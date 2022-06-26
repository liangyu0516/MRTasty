const Tag = require('../models/tag_model');

const getTags = async (req, res) => {
	const { place_id } = req.params;
	let tags = await Tag.getTags(place_id)
	res.status(200).json(tags)
};

module.exports = {
	getTags,
};