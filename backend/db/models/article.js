const sequelize = require('../conn');
const { Sequelize } = sequelize;

const Article = sequelize.define('article', {
  title: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  },
})

module.exports = Article;
