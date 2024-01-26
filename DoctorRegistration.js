const express = require("express");
const router = express.Router();
const Doctor = require('./models/doctors'); 


router.post("/DoctorRegistration", async (req, res) => {
    try {
      const { name, department, email, password } = req.body;
  
      console.log('Received data from the front end:', req.body);
  
      const existingDoctor = await Doctor.findOne({ email: email });
  
      if (existingDoctor) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const newDoctor = new Doctor({
        name: name,
        department: department,
        email: email,
        password: password,
      });
  
      const savedDoctor = await newDoctor.save();
  
      res.json(savedDoctor);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    

module.exports = router