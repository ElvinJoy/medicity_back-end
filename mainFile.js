const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// =========== schemas ===========

// const User = require("./models/users");
// const Doctor = require('./models/doctors'); 
// const Booking = require('./models/bookings');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/hospitalWebsite");



var signup = require("./signup");
app.use("/signup", signup);

var loginForm = require("./loginForm");
app.use("/login", loginForm);

var appointment = require("./appointment");
app.use("/appointment", appointment);

var DoctorRegistration = require("./DoctorRegistration");
app.use("/DoctorRegistration", DoctorRegistration);

var DoctorLoginForm = require("./DoctorLoginForm");
app.use("/DoctorLoginForm", DoctorLoginForm);




app.listen(8000, () => {
  console.log(`Server has been started `);
});
