const express = require('express');
const router = express.Router();
const { addVehicle, getAvailableVehicles, getAllVehicles } = require('../controllers/vehicleController');

router.post('/', addVehicle);
router.get('/available', getAvailableVehicles);
router.get('/', getAllVehicles);

module.exports = router;
