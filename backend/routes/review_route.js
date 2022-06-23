const router = require('express').Router();
const { getReviews } = require('../controllers/review_controller')

router.route('/review/:place_id').get(getReviews);
module.exports = router;
