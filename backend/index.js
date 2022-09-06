const express = require('express');
const cors = require('cors');
const port = 5000;
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');
const virusTotalRouter = require('./routes/virusTotalRoutes');

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use('/', virusTotalRouter);

app.use(errorMiddleware);

app.listen(port);
