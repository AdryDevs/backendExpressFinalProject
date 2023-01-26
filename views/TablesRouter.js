
const express = require ('express');
const router = express.Router ();

const TablesController = require ('../controllers/TablesController');
const { authBearerMiddleware, isValidRoleAdmin } = require ('../middlewares/auth');

//Endpoints

router.get ('/', authBearerMiddleware, TablesController.getAllTables);
router.get ('/admin/all', authBearerMiddleware, isValidRoleAdmin, TablesController.getAllTablesAvailable);


module.exports = router;