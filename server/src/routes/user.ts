import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import auth from "../middleware/auth";
import { AuthRequest } from "../middleware/auth";
import { IUser } from "../models/User";
import { HydratedDocument } from "mongoose";

const router = express.Router();

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

    if (user !== null) {
      const isMatch = await bcrypt.compare(password, user.password);

      // Compare provided password to stored password
      if (user && isMatch) {
        // Create signed JWT token
        const token = await user.generateAuthToken();

        return res.status(200).json({ user, token });
      } else {
        return res.status(400).send("Credentials do not match.");
      }
    }
    return res.status(404).send("User does not exist.");
  } catch (error) {
    res.status(500).send();
  }
});

// Log User Out
router.post("/users/logout", auth, async (req: AuthRequest, res) => {
  try {
    // This cb function only gets invoked after auth, auth always makes sure
    // user and token exist
    const user = req.user!;
    user.tokens = user.tokens.filter((tokenWrapper) => {
      return tokenWrapper.token != req.token;
    });

    await user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//TODO: Implement delete User
router.delete("/users", async (req, res) => {});

// Get User
router.get("/users/:userId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user !== null) {
      const resultUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return res.status(200).send({ user: resultUser });
    }
    return res.status(404).send("User not found.");
  } catch (error) {
    return res.status(500).send();
  }
});

// Get User's Profile
router.get("/users/:userId/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { _id, profileInfo } = user as HydratedDocument<IUser>;

    if (user !== undefined) {
      //TODO: Make use of mongoose subdocument syntax
      const resultUser = {
        _id,
        profileInfo,
      };

      return res.status(200).send({ user: resultUser });
    }
    return res.status(404).send("User does not exist.");
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
    const user = await User.findById(req.params.userId);
    const { _id, settingsInfo } = user as HydratedDocument<IUser>;

    if (user !== undefined) {
      //TODO: Make use of mongoose subdocument syntax
      const resultUser = {
        _id,
        settingsInfo,
      };

      return res.status(200).send({ user: resultUser });
    }

    return res.status(404).send("User does not exist.");
    
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
