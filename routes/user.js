const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Added some extra endpoints to get all users and delete user
// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username email created_at updated_at");
    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// POST /api/v1/user/signup
router.post(
  "/signup",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({
        message: "User created successfully",
        user_id: user._id,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// POST /api/v1/user/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if username exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      //
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };

      // sign the token
      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        return res.status(200).json({
          message: "Login successful",
          jwt_token: token,
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// Export user routes
module.exports = router;
