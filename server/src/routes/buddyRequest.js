import express from "express";
import BuddyRequest from "../models/BuddyRequest.js";
import User from "../models/User.js";
import auth from '../middleware/auth.js'

const router = new express.Router();

//TODO: Possibly abstract logic since buddy.js and buddyRequest.js are so similar
// TODO: Make it so a buddy request cannot exist if two users are already part of a Buddy Pair
router.post("/users/:userId/requests", auth, async (req, res) => {
  const userId = req.params.userId;
  const requesterEmail = req.body.email;

  const requester = await User.findOne({ email: requesterEmail });
  const requesterId = requester?._id;

  if (requesterId?.equals(userId)) {
    return res.status(403).send("User cannot send a buddy request to themselves.");
  }

  if (!requesterId) {
    return res.status(404).send("Requester does not exist.");
  }

  const existingRequestPair = await BuddyRequest.findOne({
    userId,
    requesterId,
  });

  const revRequestPair = await BuddyRequest.findOne({
    userId: requesterId,
    requesterId: userId,
  });

  if (existingRequestPair || revRequestPair) {
    return res.status(409).send("User already has a request from this requester.");
  }

  const requesterPair = await BuddyRequest.create({
    userId,
    requesterId
  });

  res.status(201).json(requesterPair);
});

router.get("/users/:userId/requests", auth, async (req, res) => {
  const requesters = await BuddyRequest.find().where("userId").equals(req.params.userId);

  const resultRequesters = requesters.map(({ requesterId }) => {
    return requesterId;
  });

  res.status(200).json(resultRequesters);
});

router.get("/users/:userId/requests/:requesterId", auth, async (req, res) => {
  //TODO: abstract this logic of having to find both combinations to middleware
  const { userId, requesterId } = req.params;
  const buddyPair = await BuddyRequest.findOne({ userId, requesterId });
  const revBuddyPair = await BuddyRequest.findOne({ userId: requesterId, requesterId: userId });

  if (!buddyPair && !revBuddyPair){
    return res.status(404).send("The user does not have a request from this requester.");
  }
  const requester = await User.findOne({ _id: req.params.requesterId });

  res.status(200).json({ requesterId: requester._id });
});

router.delete("/users/:userId/requests/:requesterId", auth, async (req, res) => {
  try {
    const { userId, requesterId } = req.params;

    const userExists = await BuddyRequest.findOneAndDelete({ userId, requesterId });
    const revUserExists = await BuddyRequest.findOneAndDelete({
      userId: requesterId,
      requesterId: userId,
    });

    if (!userExists && !revUserExists) {
      return res.status(404).send("The user does not have a request from this requester.");
    }

    res.status(200).send(userExists || revUserExists);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong ");
  }
});

export default router;
