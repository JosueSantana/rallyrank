import mongoose from "mongoose";

// TODO: Add validation for court, status, score, timeScheduled, timeFinished
const matchSchema = new mongoose.Schema({
  player1Id: { type: Schema.Types.ObjectId },
  player2Id: { type: Schema.Types.ObjectId },
  court: String,
  status: String,
  score: String,
  winner: { type: Schema.Types.ObjectId },
  timeScheduled: Date,
  timeFinished: Date,
});

const Match = mongoose.model("User", matchSchema);

export default Match;
