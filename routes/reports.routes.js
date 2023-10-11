
const express =  require('express');
const router  = express.Router();
const reportsController = require('../controllers/reports.controller');

/*
router.get('/reports', reportsController.getReport);
router.post('/reports', reportsController.postReport);
*/

router.get('/reports', reportsController.getLeads);
router.get('/data', reportsController.getLeadsData);


module.exports = router;