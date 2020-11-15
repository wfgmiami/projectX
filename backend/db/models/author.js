const sequelize = require('../conn');
const { Sequelize } = sequelize;

const Author = sequelize.define('author', {
  name: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})

module.exports = Author;
