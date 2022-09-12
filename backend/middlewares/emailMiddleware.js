const sendChart = require('../email/mailResults');
const { logger } = require('../logger/logger');

const emailMiddlware = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      const error = new Error('Missing data in the request');
      error.statusCode = 400;
      throw error;
    }
    await sendChart(data);
    logger.info(`sucessfully sent email to ${data.emailAddress}`);
    res.json({ message: 'email has been successfully sent' });
  } catch (error) {
    error.statusCode = error.code || 500;
    next(error);
  }
};
module.exports = emailMiddlware;
