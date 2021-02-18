const fs = require("fs");
const hb = require("handlebars");
const exec = require("child_process").execSync;

module.exports = {
  preHook: function (path, data, logger) {
    // Remove Jenkinsfile if not using it
    if (!data.jenkinsEnvironment) {
      logger.info("Removing Jenkinsfile...");
      fs.unlinkSync(`${path}/Jenkinsfile.{{{jenkinsEnvironment}}}`);
    }

    // Create a database config-template
    if (data.mongo) {
      logger.info("Creating databaseConfig template file...");
      fs.copyFileSync(`${path}/.progen/templates/databaseConfig.json`, `${path}/config-templates/databaseConfig.json`);
      
      // Create a models folder if needed
      if (data.mongoCollections.length > 0) {
        logger.info("Creating a models folder...");
        fs.mkdirSync(`${path}/src/api/models`);
    
        // Create model files
        const models = data.mongoCollections.split(",").map(m => m.trim());
        for (const model of models) {
          const modelFile = `${path}/src/api/models/${model}.ts`;
          logger.info(`Creating a '${model}' model file...`);
          fs.copyFileSync(`${path}/.progen/templates/model.ts`, modelFile);

          // Required because these template variables are derived from the main variables
          logger.info(`Populating '${model}' model template file...`);
          const templateData = { model, modelUppercase: `${model.charAt(0).toUpperCase()}${model.slice(1)}` };
          const fileContent = fs.readFileSync(modelFile, "utf8");
          const templateFunc = hb.compile(fileContent);
          const newContent = templateFunc(templateData);
          
          fs.writeFileSync(modelFile, newContent);
        }
      }
    }
  }
}