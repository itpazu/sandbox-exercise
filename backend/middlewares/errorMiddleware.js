const errorMiddleware = (err, _, res, __) => {
  console.log(err.message);
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ type: JSON.stringify(statusCode), message: err.message });
};

module.exports = errorMiddleware;
