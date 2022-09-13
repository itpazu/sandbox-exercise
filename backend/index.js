if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const virusTotalRouter = require('./routes/virusTotalRoutes');
const emailRouter = require('./routes/emailRequestRoute');
const { expressLogger, errorLogger } = require('./logger/logger');
const sendMail = require('./email/mailResults');
const { WHITELISTED_CLIENTS } = require('./config');

const port = 5000;
const app = express();
app.use(
  cors({
    origin: WHITELISTED_CLIENTS,
  })
);
app.use(expressLogger);
app.use('/', virusTotalRouter);
app.use('/email', emailRouter);
app.use(errorLogger);
app.use(errorMiddleware);

process.env.SENDGRID_API_KEY;
process.title = 'sandbox-server';
app.listen(port);
