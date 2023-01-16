import express from "express";
import Court from "../models/Court";

const router = express.Router();

//Get All Courts
router.get("/courts", async (req, res) => {
  try {
    const courts = await Court.find();

    return res.status(200).send(courts);
  } catch (error) {
    console.log(error);

    return res.status(500).send();
  }
});

//Get a Court by Id
router.get("/courts/:courtId", async (req, res) => {
  try {
    const court = await Court.findById(req.params.courtId);
    
    if (court !== undefined) {
      return res.status(200).json(court);
    }
    return res.status(404).send("Court does not exist.");
  } catch (error) {
    return res.status(500).send();
  }
});

//TODO: Implement route
router.delete("/courts/:courtId", async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.courtId);

    if (!court) {
      return res.status(200).json(court);
    }
    return res.status(404).send("Court does not exist.");
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
