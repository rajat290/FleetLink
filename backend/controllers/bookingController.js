const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

exports.bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    const conflictingBooking = await Booking.findOne({
      vehicleId,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } },
      ],
    });

    if (conflictingBooking) {
      return res.status(409).json({ error: 'Vehicle already booked in that time slot' });
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicleId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('vehicleId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};