const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'Database', 
    process.env.MYSQL_USER || 'root', 
    process.env.MYSQL_PASSWORD || 'root',
    {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || '33061',
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