const Vehicle = require('../models/Vehicle');
const booking = require('../models/Booking');

exports.addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    const vehicles = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } });
    const bookings = await Booking.find({
      $or: [
        {
          startTime: { $lt: end },
          endTime: { $gt: start },
        },
      ],
    });

    const bookedVehicleIds = bookings.map((b) => b.vehicleId.toString());
    const availableVehicles = vehicles.filter(
      (v) => !bookedVehicleIds.includes(v._id.toString())
    );

    res.status(200).json({
      availableVehicles,
      estimatedRideDurationHours,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};