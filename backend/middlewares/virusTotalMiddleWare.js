const FormData = require('form-data');
const { logger } = require('../logger/logger');
const { getUrlForLargeFiles } = require('../external_api/virusTotalApi');
const {
  fetchFileAnalysis,
  uploadFileToVirusTotal,
} = require('../external_api/virusTotalApi');

const changeEndPointForLargeFiles = async (req, _, next) => {
  if (!req.file) {
    const err = new Error('file is missing');
    err.statusCode = 400;
    return next(err);
  }
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

const fileAnalysisMiddleware = async (req, res, next) => {
  const id = req.params;
  try {
    const response = await fetchFileAnalysis(id);
    const {
      data: { data },
    } = response;
    const {
      attributes: { status },
    } = data;

    if (status === 'queued') {
      res.statusCode = 201;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};
const uploadFile = async (req, res, next) => {
  try {
    const uploadUrl = req.locals?.url;
    const form = new FormData();
    form.append('file', req.file.buffer, 'file.txt');
    logger.info(
      `client submitted file ${req.file.originalname} | ${req.file.originalname}`
    );
    const { data } = await uploadFileToVirusTotal({ uploadUrl, form });
    const {
      data: { id },
    } = data;
    res.json({ id });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  fileAnalysisMiddleware,
  changeEndPointForLargeFiles,
  uploadFile,
};
