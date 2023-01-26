
const express = require ('express');
const router = express.Router ();

const TablesController = require ('../controllers/TablesController');
const { authBearerMiddleware, isValidRoleAdmin } = require ('../middlewares/auth');

//Endpoints

router.get ('/', authBearerMiddleware, TablesController.getAllTablesAvailable);
router.get ('/admin/all', authBearerMiddleware, isValidRoleAdmin, TablesController.getAllTables);


module.exports = router;