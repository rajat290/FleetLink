const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;



const bookingSchema  = new mongoose.Schema({
vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
},
fromPincode: {
    type: String,
    required: true
},
toPincode: {
    type: String,
    required: true
},
startTime: {
    type: Date,
    required: true
},
endTime: {
    type: Date,
    required: true
},
customerId: {
    type: String,
    required: true
},
})

module.exports = mongoose.model('Booking', bookingSchema);