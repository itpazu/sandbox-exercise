const { getUrlForLargeFiles } = require('../externalApi/virusTotalApi');

const changeEndPointForLargeFiles = async (req, _, next) => {
  try {
    const sizeMib = req.file.size / 1024 / 1024;
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
