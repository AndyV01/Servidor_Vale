const Sequelize = require('sequelize')
const { sequelize: db, sequelize } = require('../db')

const PhotoHome = db.define('photoHome', {
    
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
     });

     module.exports = PhotoHome