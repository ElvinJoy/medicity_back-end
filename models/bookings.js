const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  appointmentDate: Date,
  appointmentTime: String,
  department: String,
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
