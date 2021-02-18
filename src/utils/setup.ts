import { logger } from "./logger";

const security = require("atc-security");

/**
 * Run any functions required to start running the application server.
 */
export async function setupApplication() {
  // Set up security logger
  security.setLogger(logger);

  // Set up security group permission caching
  const componentName = "progen-test";

  // Set cache interval to 30 minutes in milliseconds
  const cacheInterval = 30 * 60 * 1000;

  // Begin caching group permissions
  await security.initGroupPermissions(componentName, cacheInterval);
}
