const express = require("express");
const router = express.Router();
const Doctor = require('./models/doctors'); 
const Booking = require('./models/bookings')


router.post("/DoctorLoginForm", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const doctor = await Doctor.findOne({ email });
  
      if (doctor) {
        if (password === doctor.password) {
         
          const doctorDepartment = doctor.department;
  
          res.json({
            message: "success",
            doctorDetails: {
              name: doctor.name,
              department: doctorDepartment,
            },
          });
        } else {
          res.json({ message: "Incorrect password" });
        }
      } else {
        res.json({ message: "No record exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


module.exports = router