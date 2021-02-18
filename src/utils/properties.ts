const configsPath = "../../configs";

/**
 * Properties stores data from the application config files.
 */
class Properties {
  externalServices: any;

  logging: any;

  server: any;

  /**
   * Fetch and store all data from config files.
   */
  constructor() {
    this.externalServices = require(`${configsPath}/externalServices.json`);
    this.logging = require(`${configsPath}/loggingConfig.json`);
    this.server = require(`${configsPath}/serverConfig.json`);
  }
}

export const properties = new Properties();
