const { createLogger, transports, format } = require('winston');
const expressWinston = require('express-winston');
const { combine, timestamp, printf, colorize, prettyPrint } = format;

const error_message_formatter = printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message}`;
    if (metadata) {
      const { meta } = metadata;
      let statusCode = `status code: ${
        JSON.stringify(meta.res?.statusCode || meta.status) || ''
      }`;
      let userAgent = ` from client: ${meta.req.headers['user-agent']}` || '';
      let errorMessage =
        meta.level === 'error' ? meta.message.split('\n')[0] : '';
      msg = [
        msg,
        errorMessage,
        statusCode,
        userAgent,
        JSON.stringify(metadata, null, '\t'),
      ]
        .filter((item) => !!item)
        .join(' / ');
    }
    return msg;
  }
);
message_formatter = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} / ${level} / ${message} `;
  if (metadata && metadata.meta) {
    msg += `/ ${metadata.meta?.req.headers['user-agent']}`;
  }
  return msg;
});
const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), error_message_formatter),
      level: 'error',
    }),
    new transports.File({
      name: 'file logging',
      filename: 'info-logs.txt',
      level: 'info',
      format: combine(timestamp(), message_formatter),
    }),
    new transports.File({
      name: 'file logging',
      filename: 'error-logs.txt',
      level: 'error',
      format: combine(timestamp(), error_message_formatter),
    }),
  ],
});

const expressLogger = expressWinston.logger({
  winstonInstance: logger,
});
const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});

module.exports = { logger, expressLogger, errorLogger };
