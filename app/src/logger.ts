import winston = require('winston');

export enum LogLevels {
  INFO = 'info',
  ERROR = 'error',
}

function log(msg, level: LogLevels = LogLevels.INFO) {
  const logger = winston.createLogger({
    level,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level,
      }),
      new winston.transports.File({ filename: 'logs/info.log' }),
    ],
  });

  if (level === 'info') {
    logger.info({
      message: msg,
    });
  } else {
    logger.error({
      message: msg,
    });
  }
}

export default log;
