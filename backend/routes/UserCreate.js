const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register endpoint
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "The password should be minimum 5 letters long!").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    // Validation to check if there is any error found.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hashing algorithm
    const salt = await bcrypt.genSalt(10);
    let hashed_password = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashed_password,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login endpoint
router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password!").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    // Validation to check if there is any error found.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      // Checking if the email exists or not.
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Incorrect email! Try again." });
      }

      // Password validation
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Incorrect password! Try again." });
      }

      // Json web token
      const data = {
        user:{
          id: userData.id
        }
      }

      // Token
      const authToken = jwt.sign(data, process.env.JWT_SECRET)
      return res.status(200).json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
