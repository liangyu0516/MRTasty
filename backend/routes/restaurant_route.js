const router = require('express').Router();
const { getRestaurantsNearStation, getRestaurantDetail } = require('../controllers/restaurant_controller')
// const { getAmount, addToWhistlist,RemoveFromWhistlist, getTrending,getUserWhistlist } = require('../controllers/collect_controller');

router.route('/restaurant').get(getRestaurantsNearStation);
router.route('/restaurant/:place_id').get(getRestaurantDetail);
module.exports = router;
