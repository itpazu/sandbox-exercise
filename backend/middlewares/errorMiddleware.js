const errorMiddleware = (err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ type: JSON.stringify(statusCode), message: err.message });
};

module.exports = errorMiddleware;
