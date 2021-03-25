const { Sequelize } = require('sequelize');
const {host, database, username, password, dialect} = require('../config')

exports.getConnection = () => {
    return new Sequelize({ host, database, username, password, dialect , ssl: true,"dialectOptions": {
        "ssl": {
           "require": true
        },
        logging: false
      }});
};
