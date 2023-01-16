import express from "express";
import BuddyPair from "../models/BuddyPair";
import User from "../models/User";
import auth from "../middleware/auth";

const router = express.Router();

// TODO: Perform more consistent error handling across routes
// TODO: Make it so buddies can ONLY be added if a buddy request exists
router.post("/users/:userId/buddies", auth, async (req, res) => {
  const userId = req.params.userId;
  const buddyEmail = req.body.email;

  const buddy = await User.findOne({ email: buddyEmail });
  const buddyId = buddy?._id;

  if (buddyId?.equals(userId)) {
    return res.status(403).send("User and buddy cannot be the same.");
  }

  if (!buddyId) {
    return res.status(404).send("Could not find buddy.");
  }

  //TODO: abstract this logic of having to find both combinations to middleware
  const existingBuddyPair = await BuddyPair.findOne({
    userId,
    buddyId,
  });

  const switchedBuddyPair = await BuddyPair.findOne({
    userId: buddyId,
    buddyId: userId,
  });

  if (existingBuddyPair || switchedBuddyPair) {
    return res.status(409).send("Users are already buddies.");
  }

  const buddyPair = await BuddyPair.create({
    userId,
    buddyId,
    matchesPlayed: 0,
  });

  return res.status(201).json(buddyPair);
});

router.get("/users/:userId/buddies", auth, async (req, res) => {
  const buddies = await BuddyPair.find()
    .where("userId")
    .equals(req.params.userId);

  const resultbuddies = buddies.map(({ buddyId }) => {
    return buddyId;
  });

  return res.status(200).json(resultbuddies);
});

router.get("/users/:userId/buddies/:buddyId", auth, async (req, res) => {
  //TODO: abstract this logic of having to find both combinations to middleware
  const { userId, buddyId } = req.params;
  const buddyPair = await BuddyPair.findOne({ userId, buddyId });
  const revBuddyPair = await BuddyPair.findOne({
    userId: buddyId,
    buddyId: userId,
  });

  if (!buddyPair && !revBuddyPair) {
    return res.status(404).send("The users are not buddies.");
  }
  const buddy = await User.findOne({ _id: req.params.buddyId });

  if (buddy !== undefined && buddy !== null) {
    const buddyProfile = buddy.profileInfo;

    return res.status(200).json(buddyProfile);
  }
});

router.delete("/users/:userId/buddies/:buddyId", auth, async (req, res) => {
  try {
    const { userId, buddyId } = req.params;

    const userExists = await BuddyPair.findOneAndDelete({ userId, buddyId });
    const revUserExists = await BuddyPair.findOneAndDelete({
      userId: buddyId,
      buddyId: userId,
    });

    if (!userExists && !revUserExists) {
      return res.status(404).send("These users are not buddies.");
    }

    return res.status(200).send(userExists || revUserExists);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong ");
  }
});

export default router;
