const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the express app
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to a test database if not already connected
  const url = 'mongodb://127.0.0.1/fleetlink_test';
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url);
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  }
});

beforeEach(async () => {
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});
});

describe('POST /api/bookings', () => {
  it('should create a booking successfully', async () => {
    const vehicle = await Vehicle.create({ name: 'Truck A', capacityKg: 1000, tyres: 6 });
    const startTime = new Date();

    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId: vehicle._id,
        fromPincode: '1000',
        toPincode: '1003',
        startTime: startTime.toISOString(),
        customerId: 'customer1'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.vehicleId).toBe(vehicle._id.toString());
  });

  it('should return 409 if booking conflicts with existing booking', async () => {
    const vehicle = await Vehicle.create({ name: 'Truck B', capacityKg: 1000, tyres: 6 });
    const startTime = new Date();

    // Create an existing booking
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
    await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: '1000',
      toPincode: '1002',
      startTime,
      endTime,
      customerId: 'customer1'
    });

    // Attempt to create a conflicting booking
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId: vehicle._id,
        fromPincode: '1000',
        toPincode: '1003',
        startTime: startTime.toISOString(),
        customerId: 'customer2'
      });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 if vehicle does not exist', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId: new mongoose.Types.ObjectId(),
        fromPincode: '1000',
        toPincode: '1003',
        startTime: new Date().toISOString(),
        customerId: 'customer1'
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /api/bookings', () => {
  it('should return all bookings', async () => {
    const vehicle = await Vehicle.create({ name: 'Truck A', capacityKg: 1000, tyres: 6 });
    const booking1 = await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: '1000',
      toPincode: '1003',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      customerId: 'customer1'
    });
    const booking2 = await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: '1001',
      toPincode: '1004',
      startTime: new Date(),
      endTime: new Date(Date.now() + 7200000),
      customerId: 'customer2'
    });

    const res = await request(app).get('/api/bookings');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[1]).toHaveProperty('_id');
  });
});

describe('DELETE /api/bookings/:id', () => {
  it('should delete a booking successfully', async () => {
    const vehicle = await Vehicle.create({ name: 'Truck A', capacityKg: 1000, tyres: 6 });
    const booking = await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: '1000',
      toPincode: '1003',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      customerId: 'customer1'
    });

    const res = await request(app).delete(`/api/bookings/${booking._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Booking cancelled successfully');
  });

  it('should return 404 if booking does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const res = await request(app).delete(`/api/bookings/${nonExistentId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Booking not found');
  });
});
