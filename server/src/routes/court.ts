import express from "express";
import Court from "../models/Court";

const router = express.Router();

//TODO: Implement route
router.get("/courts", (req, res) => {
  try {
    // const courts =  Court.find();

  } catch (error) {
    return res.status(500).send();
  }
  res.end();
});

//TODO: Implement route
router.get("/courts/:courtId", (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send();
  }
});

//TODO: Implement route
router.delete("/courts/:courtId", (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
