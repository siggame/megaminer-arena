import { transports, createLogger, format } from "winston";
import { hostname } from "os";

import { properties } from "./properties";

// Create a new logger for the application using the config properties
export const logger = createLogger({
  exitOnError: false,
  handleExceptions: true,
  format: format.combine(format.timestamp(), format.json()),
});

// If the config says to log to the console, add it to the logger
if (properties.logging.console) {
  const consoleTransport = new transports.Console(properties.logging.console);
  logger.add(consoleTransport);
}

// If the config says to log to a file, add it to the logger
if (properties.logging.file) {
  properties.logging.file.filename += `-${hostname}.log`;
  const fileTransport = new transports.File(properties.logging.file);
  logger.add(fileTransport);
}

// Output stream used by morgan, the HTTP request logger
// Configure it to utilize our winston logger
export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};
