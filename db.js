const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'Database', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASSWORD || 'root',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '33061',
        dialect: 'mysql',
        operatorAliases: false,
        pool: {
            max: 5,  //maximum number of connection in pool
            min: 0,  //minimum number of connection in pool
            acquire: 30000, //maximum time, in milliseconds, that a connection can be idle before being released
            idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
        },
    }
);

module.exports = sequelize