const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the express app
const Vehicle = require('../models/Vehicle');
const mongoose = require('mongoose');

beforeAll(async () => {
  // No need to connect here, app connects on import
});

afterAll(async () => {
  // Clean up database and close connection
  if (mongoose.connection.readyState !== 0) {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  }
});

beforeEach(async () => {
  await Vehicle.deleteMany({});
});

describe('POST /api/vehicles', () => {
  it('should create a new vehicle with valid data', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({
        name: 'Truck A',
        capacityKg: 1000,
        tyres: 6
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Truck A');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({
        name: 'Truck B'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /api/vehicles/available', () => {
  it('should return 400 if required query params are missing', async () => {
    const res = await request(app).get('/api/vehicles/available');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return available vehicles excluding booked ones', async () => {
    // Create vehicles
    const vehicle1 = await Vehicle.create({ name: 'Truck 1', capacityKg: 1000, tyres: 6 });
    const vehicle2 = await Vehicle.create({ name: 'Truck 2', capacityKg: 1500, tyres: 8 });

    // Create a booking that overlaps with the requested time for vehicle1
    const Booking = require('../models/Booking');
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
    await Booking.create({
      vehicleId: vehicle1._id,
      fromPincode: '1000',
      toPincode: '1002',
      startTime,
      endTime,
      customerId: 'customer1'
    });

    // Query available vehicles with capacityRequired 900, fromPincode 1000, toPincode 1003, startTime now
    const res = await request(app)
      .get('/api/vehicles/available')
      .query({
        capacityRequired: 900,
        fromPincode: '1000',
        toPincode: '1003',
        startTime: startTime.toISOString()
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('availableVehicles');
    expect(res.body.availableVehicles.length).toBe(1);
    expect(res.body.availableVehicles[0]._id).toBe(vehicle2._id.toString());
  });
});

describe('GET /api/vehicles', () => {
  it('should return all vehicles', async () => {
    const vehicle1 = await Vehicle.create({ name: 'Truck 1', capacityKg: 1000, tyres: 6 });
    const vehicle2 = await Vehicle.create({ name: 'Truck 2', capacityKg: 1500, tyres: 8 });

    // Verify vehicles exist in DB directly
    const vehiclesInDb = await Vehicle.find();
    console.log('Vehicles in DB:', vehiclesInDb);

    const res = await request(app).get('/api/vehicles');

    // Debug log to verify response body
    console.log('GET /api/vehicles response:', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(vehiclesInDb.length);
    expect(res.body[0].name).toBe(vehicle1.name);
    expect(res.body[1].name).toBe(vehicle2.name);
  });
});
