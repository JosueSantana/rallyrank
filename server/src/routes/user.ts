import express from "express";
import bcrypt from "bcryptjs";
import { HydratedDocument } from "mongoose";
import User from "../models/User";
import auth from "../middleware/auth";
import { AuthRequest } from "../middleware/auth";
import { IUser } from "../models/User";

const router = express.Router();

// Register User
router.post("/users", async (req, res) => {
  try {
    // Get user input
    const { email, password, profileInfo, settingsInfo } = req.body;

    const { firstName, lastName } = profileInfo;

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
      email: email.toLowerCase(),
      password: encryptedPassword,
      profileInfo: { ...profileInfo },
      settingsInfo: { ...settingsInfo },
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
router.post("/users/login", async (req: AuthRequest, res) => {
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

// Delete User
//TODO: Delete all buddyPairs and buddyRequests including userId
router.delete("/users", auth, async (req: AuthRequest, res) => {
  try {
    console.log(req.user);

    const user = await User.findByIdAndDelete(req.user!._id);

    //TODO: abstract getting a public-friendly view of user to middleware
    if (user !== null) {
      const resultUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return res.status(200).send({ user: resultUser });
    }
    return res.status(404).json("User does not exist.");
  } catch (error) {
    return res.status(400).send();
  }
});

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

// Update User's Profile
router.patch("/users/:userId/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.userId);

    if (user != undefined) {
      updates.forEach((update: string) => {
        const profileInfo = user.profileInfo;
        if (update in profileInfo) {
          profileInfo[update] = req.body[update];
        }
      });
      await user.save();

      return res.status(200).send();
    }
    return res.status(404).send("User not found.");
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

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



//TODO: Settings and Profile routes are almost identical, maybe abstract to middleware
// Update User's Settings
router.patch("/users/:userId/settings", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.userId);

    if (user != undefined) {
      updates.forEach((update: string) => {
        const settingsInfo = user.settingsInfo;
        if (update in settingsInfo) {
          settingsInfo[update] = req.body[update];
        }
      });
      await user.save();

      return res.status(200).send();
    }
    return res.status(404).send("User not found.");
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

//TODO: Implement Reset password
router.patch("/users/:userId/forgot-password", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.userId);

    if (user != undefined) {
      updates.forEach((update: string) => {});
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

export default router;
