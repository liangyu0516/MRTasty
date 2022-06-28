const router = require('express').Router();
const { wrapAsync, authorization } = require('../../utils/util')
const { getReviews, addReview } = require('../controllers/review_controller')

router.route('/review/:place_id').get(getReviews);
router.route('/review/:place_id').post(authorization, addReview);

module.exports = router;
