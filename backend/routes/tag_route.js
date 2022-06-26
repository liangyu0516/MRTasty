const router = require('express').Router();
const { getTags } = require('../controllers/tag_controller')

router.route('/tag/:place_id').get(getTags);
module.exports = router;
