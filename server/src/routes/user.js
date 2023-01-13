import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import auth from '../middleware/auth.js'

// TODO: Read about express.Router
const router = new express.Router();

// FIXME: Don't pass password directly to DB, do through middleware
// TODO: Support multiple tokens
router.post("/users", async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("Missing required fields.");
    }

    // Validate if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).send("User already exists.");
    }

    // Encrypt the user password
    const encryptedPassword = await bcrypt.hash(password, 8);

    // Create a user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });


    // Create a signed JWT
    const token = await user.generateAuthToken();

    // Return new user
    res.status(201).json({user, token});
  } catch (error) {
    console.log(error);
  }
});

// TODO: Implement route
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

      res.status(200).json({user, token});
    } else {
      res.status(400).send("Credentials do not match.");
    }
  } catch (error) {
    console.log(error);
  }
});

// TODO: Implement route
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenWrapper) => {
      return tokenWrapper.token != req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    console.log(error);
  }
});

// TODO: Implement route
router.get("/users/:userId", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/profile", async (req, res) => {});

// TODO: Implement route
router.patch("/users/:userId/profile", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/settings", async (req, res) => {});

// TODO: Implement route
router.patch("/users/:userId/settings", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/requests", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/requests/:buddyId", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/buddies", async (req, res) => {});

// TODO: Implement route
router.get("/users/:userId/buddies/:buddyId", async (req, res) => {});

// TODO: Implement route
router.delete("/users/:userId", async (req, res) => {});

// TODO: Implement route
router.delete("/users/:userId/requests/:buddyId", async (req, res) => {});

// TODO: Implement route
router.delete("/users/:userId/buddies/:buddyId", async (req, res) => {});

// TODO: Implement route
router.delete("/users/:userId/buddies/:buddyId", async (req, res) => {});

// TODO: Implement route
router.get(
  "/users/:userId/buddies/:buddyId/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.post(
  "/users/:userId/buddies/:buddyId/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.patch(
  "/users/:userId/buddies/:buddyId/messages/:messageId",
  async (req, res) => {}
);

// TODO: Implement route
router.delete(
  "/users/:userId/buddies/:buddyId/messages/:messageId",
  async (req, res) => {}
);

export default router;
