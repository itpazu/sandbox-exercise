const { Router } = require('express');
const bodyParser = require('body-parser');
const emailMiddlware = require('../middlewares/emailMiddleware');

const router = new Router();
router.use(bodyParser.json());

router.post('', emailMiddlware);

module.exports = router;
