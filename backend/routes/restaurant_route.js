const router = require('express').Router();
const { getRestaurantsNearStation, getRestaurantDetail } = require('../controllers/restaurant_controller')

router.route('/restaurant').get(getRestaurantsNearStation);
router.route('/restaurant/:place_id').get(getRestaurantDetail);
module.exports = router;
