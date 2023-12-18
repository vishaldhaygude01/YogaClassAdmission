const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.post('/enroll', batchController.enroll);

module.exports = router;
