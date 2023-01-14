import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = new express.Router();

// Register User
router.post("/users", async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password, profileInfo, settingsInfo } =
      req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("Missing required fields.");
    }

    // Validate if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    // Encrypt the user password
    const encryptedPassword = await bcrypt.hash(password, 8);

    // Create a user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      profileInfo,
      settingsInfo,
    });

    // Create a signed JWT
    const token = await user.generateAuthToken();

    // Return new user
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// Log User In
router.post("/users/login", async (req, res) => {
  //login logic goes here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("Missing required fields.");
    }

    // Check if user exists
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    // Compare provided password to stored password
    if (user && isMatch) {
      // Create signed JWT token
      const token = await user.generateAuthToken();

      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Credentials do not match.");
    }
  } catch (error) {
    res.status(500).send();
  }
});

// Log User Out
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenWrapper) => {
      return tokenWrapper.token != req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//TODO: Implement delete User
router.delete("/users", async(req,res) => {

});

// Get User
router.get("/users/:userId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const resultUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.send({ user: resultUser });
  } catch (error) {
    res.status(500).send();
  }
});

// Get User's Profile
router.get("/users/:userId/profile", auth, async (req, res) => {
  try {
    const { _id, profileInfo } = await User.findById(req.params.userId);

    //TODO: Make use of mongoose subdocument syntax
    const resultUser = {
      _id,
      profileInfo,
    };

    res.send({ user: resultUser });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

//TODO: Implement Update User's Profile
router.patch("/users/:userId/profile", auth, async (req, res) => {});

// Get User's Settings
router.get("/users/:userId/settings", auth, async (req, res) => {
  try {
    const { _id, settingsInfo } = await User.findById(req.params.userId);

    //TODO: Make use of mongoose subdocument syntax
    const resultUser = {
      _id,
      settingsInfo
    };

    res.send({ user: resultUser });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

//TODO: Implement Update User's Settings
router.patch("/users/:userId/settings", auth, async (req, res) => {});

//TODO: Implement Reset password
router.patch("/users/:userId/forgot-password", auth, async (req, res) => {});

export default router;
