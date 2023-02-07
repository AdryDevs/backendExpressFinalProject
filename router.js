
const express = require ('express');
const router = express.Router();

//Importing routes
const UserRouter = require ('./views/UserRouter');
const BookingRouter = require ('./views/BookingRouter');


//Middlewares
const { authBearerMiddleware, isValidRoleAdmin } = require ('./middlewares/auth');

//Routes
router.use ('/user', UserRouter);
router.use ('/booking', authBearerMiddleware, BookingRouter);



module.exports = router;
