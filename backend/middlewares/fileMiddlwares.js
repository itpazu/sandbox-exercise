const { getUrlForLargeFiles } = require('../external_api/virusTotalApi');

const changeEndPointForLargeFiles = async (req, _, next) => {
  if (!req.file) {
    const err = new Error('file is missing');
    err.statusCode = 400;
    return next(err);
  }
  try {
    const sizeMib = req.file?.size / 1024 / 1024;
    if (sizeMib >= 32) {
      const {
        data: { data: url },
      } = await getUrlForLargeFiles();
      req.locals = { url };
    }
    next();
  } catch (err) {
    return next(err);
  }
};
module.exports = { changeEndPointForLargeFiles };
