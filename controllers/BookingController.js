
const Models = require('../models/index');
const { Op } = require('sequelize');

const BookingController = {};

//CRUD  

//Create

BookingController.createBooking = async (req, res) => {
    try {
        const { username, email, phone, date, meal, people, message } = req.body;
        let newBooking = await Models.booking.create({
            username,
            email,
            phone,
            date,
            meal,
            people,
            message
        }, {
            fields: ['username', 'email', 'phone', 'date', 'meal', 'people', 'message']
        });
        if (newBooking) {
            return res.json({
                message: 'Booking created successfully',
                data: newBooking
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating booking',
            data: {}
        });
    }
};


//Read

BookingController.getAllBookings = async (req, res) => {
    try{
        const bookings = await Models.booking.findAll();
        res.json(
            bookings
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting all bookings',
            data: {}
        });
    }
};







BookingController.getBookingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Models.booking.findAll({
            where: {
                id_user: id
            }
        });
        console.log(bookings);
        res.json({
            bookings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting users bookings',
            data: {}
        });
    }
};

BookingController.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await Models.booking.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Booking deleted successfully',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting booking',
            data: {}
        });
    }
};





module.exports = BookingController;
