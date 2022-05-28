const Sequelize = require('sequelize')
const { sequelize: db, sequelize } = require('../db')

const Banner = db.define('banner', {
    
    public_id: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    estado: {
        type: Sequelize.STRING,
    }
     });

     module.exports = Banner