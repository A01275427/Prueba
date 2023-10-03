const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');

router.get('/test', leadsController.getTest);
router.post('/test', leadsController.postTest);

router.get('/upload', leadsController.getUpload);
router.post('/upload', leadsController.postUpload);

module.exports = router;