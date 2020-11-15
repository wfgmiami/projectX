const sequelize = require('../conn');

const { Sequelize } = sequelize;

const axios = require('axios');
const md5 = require('crypto-md5');

const UserAddress = require('./user-address');
const UserRole = require('./user-role');

const User = sequelize.define('user', {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.TEXT,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING
    },
    streetaddress: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipcode: {
      type: Sequelize.STRING
    }
  },
  {
    scopes: {
      address: {
        include: [{
          model: UserAddress,
          order: [
            sequelize.fn('max', sequelize.col('id'))
          ]
        }]
      },
      'user-role': {
        include: [{
          model: UserRole,
        }]
      }
    },
    hooks: {
      beforeCreate(user) {
        user.password = md5(user.password, 'hex');
        return user;
      },
      beforeBulkCreate(users) {
        users = users.map( user => {
          user.password = md5(user.password, 'hex');
          return user;
        })
        return users;
      }
    },
  }
);

User.findByPassword = function findByPassword(credentials) {
  if (!credentials) throw new Error('No credentials provided');
  if (!credentials.password) throw new Error('Password must be included in credentials');
  credentials.password = md5(credentials.password, 'hex');
  return this.scope('address', 'user-role').findOne({ where: credentials });
}

module.exports = User;
