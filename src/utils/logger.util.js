import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

import { config } from '../configs/config.js';

const logDir = 'logs';
const logDatePattern = 'YYYYMMDD';
const { maxFiles: logMaxFiles } = config.logging;

const LOG_COLORS = {
  info: '\x1b[32m', // green
  error: '\x1b[31m', // red
  warn: '\x1b[33m', // yellow
  debug: '\x1b[34m', // blue
  default: '\x1b[37m', // white
};

const logOnly = (level) =>
  format((info) => {
    if (info.level === level) {
      return info;
    }
  })();

const colorize = (level, message = null) => {
  const colorEnd = '\x1b[0m';
  const color = LOG_COLORS[level] || LOG_COLORS.default;

  if (message) return `${color}${message}${colorEnd}`;

  return `${color}${level.toUpperCase()}${colorEnd}`;
};

const logFormat = (opts = {}) => {
  const color = opts.color || false;

  return format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';

    // fix the SonarQube warning:
    // <var> will use Object's default stringification format ('[object Object]') when stringified
    const _timestamp = typeof timestamp === 'string' ? timestamp : JSON.stringify(timestamp);
    const _message = typeof message === 'string' ? message : JSON.stringify(message);

    if (!color) {
      return `[${_timestamp}] [${level.toUpperCase()}] ${_message} ${metaString}`;
    }

    const _colorString = colorize(level, `[${_timestamp}] [${level.toUpperCase()}] ${_message}`);
    return `${_colorString} ${metaString}`;
  });
};

export const logger = createLogger({
  format: format.combine(format.timestamp(), logFormat()),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), logFormat({ color: true })),
      level: 'silly',
    }),
    new transports.DailyRotateFile({
      level: 'error',
      dirname: logDir,
      filename: 'error.log.%DATE%',
      datePattern: logDatePattern,
      maxFiles: logMaxFiles,
      createSymlink: true,
      symlinkName: 'error.log',
      auditFile: `${logDir}/error.audit.json`,
    }),
    new transports.DailyRotateFile({
      level: 'info',
      format: logOnly('info'),
      dirname: logDir,
      filename: 'info.log.%DATE%',
      datePattern: logDatePattern,
      maxFiles: logMaxFiles,
      createSymlink: true,
      symlinkName: 'info.log',
      auditFile: `${logDir}/info.audit.json`,
    }),
  ],
});
