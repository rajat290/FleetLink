const express = require('express');
const router = express.Router();
const { bookVehicle, cancelBooking, getBookings } = require('../controllers/bookingController');

router.post('/', bookVehicle);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);
// router.get('/available', (req, res) => {
//   res.send('Available bookings route');
// });

module.exports = router;
