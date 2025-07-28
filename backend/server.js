const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');




const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('FleetLink Backend Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
