const express = require('express');
const router = express.Router();
const { bookVehical } = require('../controllers/bookingController');

router.post('/', bookVehical);
// router.get('/available', (req, res) => {
//   res.send('Available bookings route');
// });

module.exports = router;