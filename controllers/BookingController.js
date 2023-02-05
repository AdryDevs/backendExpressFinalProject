
const Models = require('../models/index');
const { Op } = require('sequelize');
const jsonwebtoken = require('jsonwebtoken');

const BookingController = {};

//CRUD  

//Create

BookingController.createBooking = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    
    try {
        const { username, email, phone, date, meal, people, message } = req.body;
        const id_user = payload.id;

        let newBooking = await Models.booking.create({
            username,
            email,
            phone,
            date,
            meal,
            people,
            message,
            id_user
        }, {
            fields: ['username', 'email', 'phone', 'date', 'meal', 'people', 'message', 'id_user']
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







// Controller for getting bookings of an specific user by id

BookingController.getBookingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Models.booking.findAll({
            where: {
                id_user: id
            }
        });
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting bookings by id',
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
