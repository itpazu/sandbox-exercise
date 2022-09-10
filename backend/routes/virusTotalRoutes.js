const { Router } = require('express');
const multer = require('multer');
const FormData = require('form-data');
const { logger } = require('../logger/logger');

const {
  changeEndPointForLargeFiles,
} = require('../middlewares/fileMiddlwares');
const {
  fetchFileAnalysis,
  uploadFileToVirusTotal,
} = require('../external_api/virusTotalApi');

const router = new Router();
const upload = multer();

router.get('/analysis/:id', async (req, res, next) => {
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
});
router.use('/upload', upload.single('file'));
router.use('/upload', changeEndPointForLargeFiles);
router.post('/upload', async (req, res, next) => {
  try {
    const uploadUrl = req.locals?.url;
    const form = new FormData();
    form.append('file', req.file.buffer, 'file.txt');
    logger.info(`client submitted file ${req.file.originalname}`);
    const { data } = await uploadFileToVirusTotal({ uploadUrl, form });
    const {
      data: { id },
    } = data;
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
