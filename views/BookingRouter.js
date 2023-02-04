
const express = require('express');
const router = express.Router();

const BookingController = require('../controllers/BookingController');
const { authBearerMiddleware, isValidRoleAdmin } = require('../middlewares/auth');

//Endpoints

router.get('/',authBearerMiddleware, isValidRoleAdmin, BookingController.getAllBookings);
router.delete('/:id', authBearerMiddleware, isValidRoleAdmin ,BookingController.deleteBooking);
router.post('/new', BookingController.createBooking);
router.get('/:id', BookingController.getBookingsById);



module.exports = router;