const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// =========== schemas ===========

const User = require("./models/users");
const Doctor = require('./models/doctors'); 
const Booking = require('./models/bookings');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/hospitalWebsite");



//  =========== signup of user ===========

app.post("/signup", async (req, res) => {
  try {
    console.log('Received signup data on the backend:', req.body);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


//  =========== login of user ===========


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({ message: "success" });
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


// =========== doctor bookings of user ===========


app.post('/appointment', async (req, res) => {
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


// =========== adding doctors by admin ===========


app.post("/DoctorRegistration", async (req, res) => {
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


// =========== doctor login ===========

app.post("/DoctorLoginForm", async (req, res) => {
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





app.listen(8000, () => {
  console.log(`Server has been started `);
});
