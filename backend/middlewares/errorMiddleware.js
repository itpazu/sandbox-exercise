const errorMiddleware = (err, _, res, __) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ type: 'error', message: err.message });
};

module.exports = errorMiddleware;
