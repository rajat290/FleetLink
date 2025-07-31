const express = require('express');
const router = express.Router();
const { bookVehicle } = require('../controllers/bookingController');

router.post('/', bookVehicle);
// router.get('/available', (req, res) => {
//   res.send('Available bookings route');
// });

module.exports = router;