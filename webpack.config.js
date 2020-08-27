// Merge dev/prod configuration with common configuration, depending on environment.
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const developmentConfig = require('./webpack.dev.js');
const productionConfig = require('./webpack.prod.js');
 
module.exports = env => {
  switch(env) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}