const Sequelize = require('sequelize');
const config = require('../configure/config');

const DATABASE_URL = config.DATABASE_URL;

module.exports = new Sequelize(DATABASE_URL, { logging: false });
