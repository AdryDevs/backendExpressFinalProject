
const Models = require('../models');
const { Op, where } = require('sequelize');

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



// switch table.available to false or true

TablesController.updateTableAvailable = async (req, res) => {
    const { id } = req.params;
    try {
        const table = await Models.table.findOne({
            where: { id }
        });
        const newAvailable = !table.available;     
        const updatedTable = await Models.table.update({
            available: newAvailable
        }, {
            where: {
                id
            }
        });
        res.json({
            message: `Table updated, now table is ${newAvailable}`,
            data: table
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating table",
            data: {}
        });
    }
};


module.exports = TablesController;







        


module.exports = TablesController;