const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vehicle = require('./models/Vehicle');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB, seeding data...');

  await Vehicle.deleteMany(); // Clear old data

  const vehicles = [
    { name: 'Tata Ace', capacityKg: 800, tyres: 4 },
    { name: 'Ashok Leyland Dost', capacityKg: 1200, tyres: 6 },
    { name: 'Mahindra Bolero Pickup', capacityKg: 1500, tyres: 4 },
    { name: 'Eicher Pro 1049', capacityKg: 2000, tyres: 6 },
    { name: 'BharatBenz 1214R', capacityKg: 7000, tyres: 10 },
  ];

  await Vehicle.insertMany(vehicles);
  console.log('🌱 Sample vehicles seeded successfully!');
  mongoose.connection.close();
})
.catch((err) => console.error('❌ Seed error:', err));
// To run this script, ensure you have a MongoDB instance running and the MONGO_URI set in your .env file.

// ---

// ### 2. Run the Seeder Script
// From the backend root folder, run:
// ```bash
// node seed.js
// ```

// You should see:
// ```
// ✅ Connected to MongoDB, seeding data...
// 🌱 Sample vehicles seeded successfully!
// ```

// ---

// ### 3. Verify in MongoDB
// - If local: open Mongo shell → `use fleetlink` → `db.vehicles.find()`
// - If Atlas: use Atlas Data Explorer → check `fleetlink.vehicles`

// ---

// ### 4. Test in Frontend
// - Start backend with `npm run dev`
// - Open frontend → go to **Search & Book Vehicles**
// - Search for capacity and see seeded vehicles