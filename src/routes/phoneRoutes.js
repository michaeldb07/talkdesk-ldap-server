const express = require('express');
const router = express.Router();
const PhoneController = require('../controllers/phoneController');

// Create instance of controller
const phoneController = new PhoneController();

//Bind routes to controller methods to maintain 'this' context
router.get('/phones', (req, res) => phoneController.getPhones(req, res));
router.post('/sync', (req, res) => phoneController.syncPhones(req, res));

module.exports = router;
