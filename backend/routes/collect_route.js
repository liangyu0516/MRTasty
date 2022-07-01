const router = require('express').Router();
const { wrapAsync, authorization } = require('../../utils/util')
const { getCollect, checkCollect, addCollect, deleteCollect } = require('../controllers/collect_controller')

router.route('/collect').get(authorization, getCollect);
router.route('/collect').post(authorization, addCollect);
router.route('/collect/:place_id').delete(authorization, deleteCollect);
router.route('/collect/:place_id').get(authorization, checkCollect);

module.exports = router;
