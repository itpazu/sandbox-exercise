const axios = require('axios');
const { virusTotalConfig } = require('../config');

const fetchFileAnalysis = ({ id }) => {
  return axios.get(
    `${virusTotalConfig.VIRUS_TOTAL_URL}${virusTotalConfig.ANALYSIS_URL}/${id}`,
    {
      headers: {
        ...virusTotalConfig.DEFAULT_HEADRS,
      },
    }
  );
};

const uploadFileToVirusTotal = ({ uploadUrl, form }) => {
  console.log(uploadUrl);
  return axios.post(
    uploadUrl ||
      `${virusTotalConfig.VIRUS_TOTAL_URL}${virusTotalConfig.DEFAULT_UPLOAD}`,
    form,
    {
      headers: {
        ...form.getHeaders(),
        ...virusTotalConfig.DEFAULT_HEADRS,
      },
    }
  );
};

const getUrlForLargeFiles = ({ id }) => {
  return axios.get(
    `${virusTotalConfig.VIRUS_TOTAL_URL}${virusTotalConfig.DEFAULT_UPLOAD}/${id}`,
    {
      headers: { ...virusTotalConfig.DEFAULT_HEADRS },
    }
  );
};

module.exports = {
  fetchFileAnalysis,
  uploadFileToVirusTotal,
  getUrlForLargeFiles,
};
