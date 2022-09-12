const { Router } = require('express');
const multer = require('multer');

const {
  fileAnalysisMiddleware,
  changeEndPointForLargeFiles,
  uploadFile,
} = require('../middlewares/virusTotalMiddleWare');

const router = new Router();
const upload = multer();

router.get('/analysis/:id', fileAnalysisMiddleware);
router.post(
  '/upload',
  upload.single('file'),
  changeEndPointForLargeFiles,
  uploadFile
);

module.exports = router;
