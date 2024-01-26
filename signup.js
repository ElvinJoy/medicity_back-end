const express = require("express");
const router = express.Router();
const User = require("./models/users");

router.post("/signup", async (req, res) => {
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


module.exports = router