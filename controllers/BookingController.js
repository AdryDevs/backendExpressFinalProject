
const Models = require('../models/index');
const { Op } = require('sequelize');

const BookingController = {};

//CRUD  

//Create

BookingController.createBooking = async (req, res) => {
    try {
        const { name, email, phone, date, meal, people, message } = req.body;
        let newBooking = await Models.booking.create({
            name,
            email,
            phone,
            date,
            meal,
            people,
            message
        }, {
            fields: ['name', 'email', 'phone', 'date', 'meal', 'people', 'message']
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



//Update

BookingController.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, phone, date, time, people, message } = req.body;
    const bookings = await Models.Booking.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'phone', 'date', 'time', 'people', 'message'],
        where: {
            id
        }
    });
    if (bookings.length > 0) {
        bookings.forEach(async booking => {
            await booking.update({
                name,
                surname,
                email,
                phone,
                date,
                time,
                people,
                message
            });
        })
    }
    return res.json({
        message: 'Booking updated successfully',
        data: bookings
    })
};

BookingController.getBookingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Models.booking.findOne({
            where: {
                id
            }
        });
        res.json({
            data: bookings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting booking by id',
            data: {}
        });
    }
};





module.exports = BookingController;
