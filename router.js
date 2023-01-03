const router = require ('express').Router();

const { application } = require ('express');

//Importing routes
const UserRoutes = require ('./views/UserRouter');
const BookingRoutes = require ('./views/BookingRouter');

//Middlewares
const auth = require ('./middlewares/auth');

//Routes
router.use ('/user', UserRoutes);
router.use ('/booking', auth, BookingRoutes);
