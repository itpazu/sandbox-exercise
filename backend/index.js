const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
var path = require('path');
const axios = require('axios');
const FormData = require('form-data');
// const superagent = require('superagent');
const multer = require('multer');
const port = 5000;
const app = express();
const upload = multer();

app.get('/analysis/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${id}`,
      {
        headers: {
          accept: 'application/json',
          'x-apikey':
            'd0771b877c348f12fbe62711e6ba692c3782e5707fc5e12574c2f70968762b54',
        },
      }
    );
    const {
      data: { data },
    } = response;

    const {
      attributes: { status },
    } = data;

    if (status === 'queued') {
      res.statusCode = 302;
      res.json({ id: data.id });
    } else {
      res.json(data);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/upload', upload.single('file'), async (req, res, next) => {
  // const file = await fs.readFile(
  //   path.join(path.dirname(__dirname), '../ex.txt')
  // );
  try {
    if (!req.file) throw new Error('file is missing');

    const form = new FormData();
    form.append('file', req.file.buffer, 'file.txt');

    const response = await axios.post(
      'https://www.virustotal.com/api/v3/files',
      form,
      {
        headers: {
          ...form.getHeaders(),
          accept: 'application/json',
          'x-apikey':
            'd0771b877c348f12fbe62711e6ba692c3782e5707fc5e12574c2f70968762b54',
        },
      }
    );
    const { id } = response.data.data;
    res.redirect(`/analysis/${id}`);
  } catch (err) {
    // console.error('in catch', err.message);
    next(err);
  }
});

app.listen(port);
