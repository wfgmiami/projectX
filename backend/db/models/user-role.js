const sequelize = require('../conn');
const { Sequelize } = sequelize;


module.exports = sequelize.define('userRole', {
  roletype: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
