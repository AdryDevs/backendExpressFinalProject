
const express = require('express');
const router = express.Router();

const BookingController = require('../controllers/BookingController');
const { authBearerMiddleware, isValidRoleAdmin } = require('../middlewares/auth');

//Endpoints

router.get('/',authBearerMiddleware, isValidRoleAdmin, BookingController.getAllBookings);

router.post('/new', BookingController.createBooking);
router.put('/:id', BookingController.updateBooking);


module.exports = router;