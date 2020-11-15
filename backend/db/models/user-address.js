const sequelize = require('../conn');
const { Sequelize } = sequelize;


module.exports = sequelize.define( 'userAddress', {
  streetAddress: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipCode: Sequelize.STRING
})
