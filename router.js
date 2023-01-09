
const express = require ('express');
const router = express.Router();

//Importing routes
const UserRoutes = require ('./views/UserRouter');
const BookingRoutes = require ('./views/BookingRouter');

//Middlewares
const { authBearerMiddleware, isValidRoleAdmin } = require ('./middlewares/auth');
//Routes
router.use ('/user', UserRoutes);
router.use ('/booking', authBearerMiddleware,
//  isValidRoleAdmin 
BookingRoutes);

module.exports = router;
