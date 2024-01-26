const express = require("express");
const router = express.Router();
const Booking = require('./models/bookings');

router.post('/appointment', async (req, res) => {
    const appointmentData = req.body;
  
    try {
  
      const booking = new Booking(appointmentData);
      const savedBooking = await booking.save();
  
      console.log('Appointment Data:', savedBooking);
      res.json({ message: 'Appointment booked successfully' });
    } catch (error) {
      console.error('Error during appointment booking:', error);
  
  
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'Validation error. Please check your input.' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
  


module.exports = router