const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const virusTotalRouter = require('./routes/virusTotalRoutes');
const port = 5000;
const app = express();
const { expressLogger, errorLogger } = require('./logger/logger');

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(expressLogger);
app.use('/', virusTotalRouter);
app.use(errorLogger);
app.use(errorMiddleware);
app.listen(port);
