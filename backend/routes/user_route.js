const router = require('express').Router();
const { wrapAsync, authorization } = require('../../utils/util')
const { signUp, signIn, getProfile} = require('../controllers/user_controller')

router.route('/user/profile').get(authorization, getProfile);
router.route('/user/signup').post(wrapAsync(signUp));
router.route('/user/signin').post(wrapAsync(signIn));
module.exports = router;
