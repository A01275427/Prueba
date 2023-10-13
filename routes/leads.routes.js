const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');
const isAuth = require('../util/isAuth');
const canUpload = require('../util/canUpload');
const canConsultUsers = require('../util/canConsultU')


router.get('/test', leadsController.getTest);
router.post('/test', leadsController.postTest);

router.get('/upload', isAuth, canUpload, canConsultUsers, leadsController.getUpload);
router.post('/upload', isAuth, canUpload, canConsultUsers, leadsController.postUpload);

module.exports = router;