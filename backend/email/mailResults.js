const sgMail = require('@sendgrid/mail');
const QuickChart = require('quickchart-js');
const { BASIC_MAIL_CONFIG } = require('../config');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fillMessageTemplate = ({
  name,
  type,
  size,
  isThreatDetected,
  chartImageUrl,
}) => {
  return `<div style="font-size: 1.5em"> Dear user,
  <br/>
  <br/>
    You requested the scan results of the following file:
    <br/>
    <br/>
    <p><span style="text-decoration-line: underline">Name</span>: <b>${name}</b><p>
    <p><span style="text-decoration-line: underline">Type</span>: <b>${type}</b><p>
    <p><span style="text-decoration-line: underline">Size</span>: <b>${size}</b><p>
    <br/>
    <p> We inform you that a threat <span style="color: ${
      isThreatDetected ? 'red' : 'green'
    }"> <b>has ${isThreatDetected ? '' : 'not'} been</b> detected <span>
      during the scan</p>
     <br/>
    <p> See a summary of results from several scaning engines below.</p>
    </div>
    <img src="${chartImageUrl}" />
    `;
};
const getChartImage = ({ labels, datasets }) => {
  const summaryChart = new QuickChart();
  summaryChart
    .setConfig({
      type: 'doughnut',
      data: {
        labels,
        datasets,
      },
    })
    .setWidth(500)
    .setHeight(300)
    .setBackgroundColor('transparent');

  const chartImageUrl = summaryChart.getUrl();
  return chartImageUrl;
};

const prepareEmailObject = ({
  name,
  size,
  type,
  emailAddress: to,
  isThreatDetected,
  chartImageUrl,
}) => {
  const html = fillMessageTemplate({
    name,
    size,
    type,
    isThreatDetected,
    chartImageUrl,
  });
  return { ...BASIC_MAIL_CONFIG, html, to };
};

const sendChart = ({
  chartData: { labels, datasets, isThreatDetected },
  name,
  size,
  type,
  emailAddress,
}) => {
  const chartImageUrl = getChartImage({ labels, datasets });
  const emailObject = prepareEmailObject({
    name,
    size,
    type,
    emailAddress,
    isThreatDetected,
    chartImageUrl,
  });
  const response = sgMail.send(emailObject);
  return response;
};

module.exports = sendChart;
