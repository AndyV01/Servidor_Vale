const Sequelize = require('sequelize')
const { sequelize: db, sequelize } = require('../db')

const User = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name_u: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: false
  },
});

module.exports = User