
const express =  require('express');
const router  = express.Router();
const reportsController = require('../controllers/reports.controller');
const isAuth = require('../util/isAuth');
const canUpload = require('../util/canUpload');
const canConsultUsers = require('../util/canConsultU')
const canConsultR = require('../util/canConsultR');
const canDownloadPDF = require('../util/canDownload');

router.get('/reports', reportsController.getLeads);
router.get('/reports', reportsController.getLeadsData);

router.get('/reports', isAuth, canUpload, canConsultR, canConsultUsers, canDownloadPDF, reportsController.getReport);
router.post('/reports/data', isAuth, canUpload, canConsultR, canConsultUsers, canDownloadPDF,reportsController.postReport);




module.exports = router;