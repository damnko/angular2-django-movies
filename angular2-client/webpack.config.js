const devConfig = require('./config/webpack/webpack.dev');
const prodConfig = require('./config/webpack/webpack.prod');

const ENV = process.env.NODE_ENV;

switch (ENV) {
  case 'production':
    module.exports = prodConfig;
    break
  default:
    module.exports = devConfig;
}
