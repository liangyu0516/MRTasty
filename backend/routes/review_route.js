const router = require('express').Router();
const { wrapAsync, authorization } = require('../../utils/util')
const { getReviews } = require('../controllers/review_controller')

router.route('/review/:place_id').get(authorization, getReviews);
//router.route('/review/:place_id').get(getReviews);
module.exports = router;
