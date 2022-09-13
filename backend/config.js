const virusTotalConfig = {
  LARGE_FILE_UPLOAD: '/files/upload_url',
  VIRUS_TOTAL_URL: 'https://www.virustotal.com/api/v3',
  DEFAULT_UPLOAD: '/files',
  ANALYSIS_URL: '/analyses',
  DEFAULT_HEADRS: {
    accept: 'application/json',
    'x-apikey': process.env.VIRUS_TOTAL_XPI_KEY,
  },
};
WHITELISTED_CLIENTS = [process.env.ALLOWED_CLIENTS];

const BASIC_MAIL_CONFIG = {
  to: undefined,
  from: process.env.EMAIL_SENDER, //
  subject: 'File Scan Results',
  text: 'See below results as requested',
  html: undefined,
};

module.exports = { virusTotalConfig, WHITELISTED_CLIENTS, BASIC_MAIL_CONFIG };
