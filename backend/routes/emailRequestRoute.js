const { Router } = require('express');
const bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());

router.post('', (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data) {
      const error = new Error('no data was sent');
      error.statusCode = 400;
      throw error;
    }
    console.log(data);
    res.json({ message: 'got it' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
