const router = require('express').Router();
const { wrapAsync, authentication } = require('../../utils/util')
const { signUp, signIn } = require('../controllers/user_controller')

router.route('/user/signup').post(wrapAsync(signUp));
router.route('/user/signin').post(wrapAsync(signIn));
module.exports = router;
