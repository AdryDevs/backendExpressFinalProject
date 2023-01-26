
const Models = require('../models/index');
const { Op } = require('sequelize');

const BookingController = {};

//CRUD  

//Create

BookingController.createBooking = async (req, res) => {
    const userId = req.auth.id;
    const { name, surname, email, phone, date, people, message } = req.body;
    const newBooking = await Models.Booking.create({
        name,
        surname,
        email,
        phone,
        date,
        meal,
        people,
        message
    }, {
        fields: ['name', 'surname', 'email', 'phone', 'date', 'time', 'people', 'message']
    });
    if (newBooking) {
        return res.json({
            message: 'Booking created successfully',
            data: newBooking
        });
    }
};

//Read

BookingController.getAllBookings = async (req, res) => {
    const bookings = await Models.Booking.findAll();
    res.json({
        data: bookings
    });
};

BookingController.getBookingById = async (req, res) => {
    const { id } = req.params;
    const booking = await Models.Booking.findOne({
        where: {
            id
        }
    });
    res.json({
        data: booking
    });
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

//Delete

BookingController.deleteBooking = async (req, res) => {
    const { id } = req.params;
    const deleteRowCount = await Models.Booking.destroy({
        where: {
            id
        }
    });
    res.json({
        message: 'Booking deleted successfully',
        count: deleteRowCount
    });
};

module.exports = BookingController;
