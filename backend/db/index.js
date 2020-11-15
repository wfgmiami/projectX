const sequelize = require('./conn');

const User = require('./models/user');
const UserAddress = require('./models/user-address');
const UserRole = require('./models/user-role');
const Article = require('./models/article');
const Author = require('./models/author');

const userId = { foreignKey: 'user_id' };
const roleId = { foreignKey: 'role_id' };
const authorId = { foreignKey: 'author_id' };
const addressId = { foreignKey: 'address_id' };

User.belongsTo(UserAddress, addressId);

User.belongsTo(UserRole, roleId);
UserRole.hasMany(User, roleId);


Article.belongsTo(Author, authorId);
Author.hasMany(Article, authorId);

module.exports = {
  sequelize,
  User,
  UserAddress,
  UserRole,
  Article,
  Author
}
