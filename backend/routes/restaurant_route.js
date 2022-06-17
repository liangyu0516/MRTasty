const router = require('express').Router();
const { getRestaurantsNearStation, getRestaurantMainPhoto } = require('../controllers/restaurant_controller')
// const { getAmount, addToWhistlist,RemoveFromWhistlist, getTrending,getUserWhistlist } = require('../controllers/collect_controller');

router.route('/restaurant/:station').get(getRestaurantsNearStation);
router.route('/restaurant/photo/:photo_reference').get(getRestaurantMainPhoto);
module.exports = router;
