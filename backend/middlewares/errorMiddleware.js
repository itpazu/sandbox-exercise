const errorMiddleware = (err, _, res, __) => {
  const statusCode = err.statusCode || err?.response?.status || 500;
  console.log(statusCode);
  console.log(err.message);
  res
    .status(statusCode)
    .json({ type: JSON.stringify(statusCode), message: err.message });
};

module.exports = errorMiddleware;
