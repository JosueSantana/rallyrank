import express from "express";
import Match from "../models/Match";
import auth, { AuthRequest } from "../middleware/auth";
import User from "../models/User";

const router = express.Router();

// Add a Match
router.post("/matches/:buddyId", auth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user!._id);
    const buddy = await User.findById(req.params.buddyId);

    if (user && buddy) {
      const match = await Match.create({
        player1Id: user._id,
        player2Id: buddy._id,
        ...req.body,
      });

      return res.status(200).json(match);
    } else if (user) {
      const match = await Match.create({
        player1Id: user._id,
        player2Id: null,
        ...req.body,
      });

      return res.status(200).json(match);
    } else if (buddy) {
      const match = await Match.create({
        player1Id: null,
        player2Id: buddy._id,
        ...req.body,
      });

      return res.status(200).json(match);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(404).send();
  }
});

// Get all Matches
router.get("/matches", auth, async (req, res) => {
  try {
    const matches = await Match.find();

    return res.status(200).send(matches);
  } catch (error) {
    return res.status(500).send();
  }
});

// Get User's Matches with Buddy
router.get("/matches/:buddyId", auth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user!._id);
    const buddy = await User.findById(req.params.buddyId);

    if (user && buddy) {
      const matches = await Match.find({
        player1Id: user._id,
        player2Id: buddy._id,
      });

      return res.status(200).json(matches);
    } else if (user) {
      const matches = await Match.find({
        player1Id: user._id,
        player2Id: null,
      });

      return res.status(200).json(matches);
    } else if (buddy) {
      const matches = await Match.find({
        player1Id: null,
        player2Id: buddy._id,
      });

      return res.status(200).json(matches);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(404).send();
  }
});

export default router;
