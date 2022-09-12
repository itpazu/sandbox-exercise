const sgMail = require('@sendgrid/mail');
const QuickChart = require('quickchart-js');
const { logger } = require('../logger/logger');
const { BASIC_MAIL_CONFIG } = require('../config');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getChartImage = (data) => {
  const summaryChart = new QuickChart();
  summaryChart
    .setConfig({
      type: 'doughnut',
      data,
      //   data: {
      //     labels: ['Hello world', 'Foo bar'],
      //     datasets: [{ label: 'Foo', data: [1, 2] }],
      //   },
    })
    .setWidth(500)
    .setHeight(300)
    .setBackgroundColor('transparent');

  const chartImageUrl = summaryChart.getUrl();
  return `Hello, the file:
      <br><br>
      <img src="${chartImageUrl}" />
      `;
};

const sendMail = async (html, to) => {
  const msg = { ...BASIC_MAIL_CONFIG, html, to };
  return await sgMail.send(msg);
};

const sendChart = async (data) => {
  try {
    const res = await sendMail(getChartImage(data), 'itpazu@gmail.com');
    logger.info(`sucessfully sent email to ${'itpazu@gmail.com'}`);
  } catch (error) {
    console.log(error);
  }
};
// sendChart();
module.export = sendMail;
