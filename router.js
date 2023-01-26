
const express = require ('express');
const router = express.Router();

//Importing routes
const UserRouter = require ('./views/UserRouter');
const BookingRouter = require ('./views/BookingRouter');
const TablesRouter = require ('./views/TablesRouter');

//Middlewares
const { authBearerMiddleware, isValidRoleAdmin } = require ('./middlewares/auth');

//Routes
router.use ('/user', UserRouter);
router.use ('/booking', authBearerMiddleware, BookingRouter);
router.use ('/tables', authBearerMiddleware, isValidRoleAdmin, TablesRouter);


module.exports = router;
