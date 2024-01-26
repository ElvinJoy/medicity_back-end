const express = require("express");
const router = express.Router();
const User = require("./models/users");

router.post('/login', async (req, res) => {
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
  


module.exports = router