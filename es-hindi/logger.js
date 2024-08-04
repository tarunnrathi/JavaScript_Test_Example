const winston = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, prettyPrint, errors, json, splat, printf } =
  winston.format;
const logFilePath = "./logs/access_log";
const errorFilePath = "./logs/error_log";

const infoTransport = new winston.transports.DailyRotateFile({
  dirname: logFilePath,
  filename: "hindiapp-%DATE%.log",
  datePattern: "YYYY-MMM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "15d",
  prepend: true,
});

const errorTransport = new winston.transports.DailyRotateFile({
  level: "error",
  dirname: errorFilePath,
  filename: "hindiapp-error-%DATE%.log",
  datePattern: "YYYY-MMM-DD",
  zippedArchive: true,
  maxFiles: "10d",
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    splat(),
    prettyPrint(),
    printf(({ timestamp, ...meta }) => {
      meta.date = new Date(timestamp);
      return `${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
    })
  ),
  transports: [infoTransport, errorTransport],
});

module.exports = logger;
