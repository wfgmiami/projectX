const dotenv = require('dotenv');

const path = require('path');
// const rootPath = path.join(__dirname, '../../');
// const serverRoot = path.join(__dirname, '../');

// const secret = process.env.SECRET || 'Data-BETA';
// const oauth = require('./oauthInfo');

// module.exports = app => {
//   app.set('projectRoot', rootPath);
//   app.set('jwtSecret', secret);
//   app.set('serverRoot', serverRoot);
//   app.set('oauth', oauth);
// }

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://localhost/databeta'
}
