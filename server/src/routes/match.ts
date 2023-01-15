import express from "express";
import Match from "../models/Match.js";
import Match from "../models/BuddyPair.js";

const router = new express.Router();

//TODO: Implement route
router.post("/matches/:buddyPairId", auth, async (req, res) => {
  const buddyPair = await Match.find({ buddyPairId: req.params.buddyPairId });
  
  const matches = await Match.find();

  res.status(200).send();
});

//TODO: Implement route
router.get("/matches", auth, async (req, res) => {
  const matches = await Match.find();

  res.status(200).send();
});

//TODO: Implement route
router.get("/matches/:userId", auth, (req, res) => {
  res.end();
});

//TODO: Implement route
router.get("/matches/:buddyPairId", auth, (req, res) => {
  res.end();
});

//TODO: Implement route
router.get("/matches/:buddyPairId/count", auth, (req, res) => {
  res.end();
});

//TODO: Implement route
router.delete("/matches/:buddyPairId", auth, (req, res) => {
  res.end();
});

export default router;
