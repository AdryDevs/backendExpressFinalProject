
const Models = require('../models');
const { Op } = require('sequelize');

const TablesController = {};

//CRUD

//Get all tables available

TablesController.getAllTablesAvailable = async (req, res) => {
    try {
        const tables = await Models.table.findAll({
            where: {
                available : true
            },
        
        });
        res.json(tables);
    } catch (error) {
        res.status(500).json({
            message: "Error getting tables available",
            data: {}
        });
    }
};

//Get all tables

TablesController.getAllTables = async (req, res) => {
    try {
        const tables = await Models.table.findAll();
        res.json(tables);
    } catch (error) {
        res.status(500).json({
            message: "Error getting all tables",
            data: {}
        });
    }
};

module.exports = TablesController;