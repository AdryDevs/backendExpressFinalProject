
const express = require ('express');
const router = express.Router();

//Importing routes
const UserRoutes = require ('./views/UserRouter');
const BookingRoutes = require ('./views/BookingRouter');

//Middlewares
const auth = require ('./middlewares/auth');

// //Routes
router.use ('/user', UserRoutes);
router.use ('/booking', auth, BookingRoutes);

module.exports = router;
