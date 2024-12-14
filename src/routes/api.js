const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

router.post('/sync', directoryController.syncDirectory.bind(directoryController));
router.get('/directory', directoryController.getDirectory.bind(directoryController));

module.exports = router;
