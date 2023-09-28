const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/createUser",
  [body("email").isEmail(),body("name").isLength({ min: 5 }), body("password", "The password should be minimum 5 letters long!").isLength({ min: 5 })],
  async (req, res) => {

    // Validation to check if there is any error found.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
