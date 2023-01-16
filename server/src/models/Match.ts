import { Schema, model, Types } from 'mongoose';
// ----- INTERFACES -----
export interface IMatch {
  player1Id: Types.ObjectId;
  player2Id: Types.ObjectId;
  court: string;
  status: string;
  score: string;
  winner: Types.ObjectId;
  timeScheduled: Date;
  timeFinished: Date;
}

// TODO: Add validation for court, status, score, timeScheduled, timeFinished
// ----- SCHEMAS -----
const matchSchema = new Schema<IMatch>({
  player1Id: { type: Schema.Types.ObjectId },
  player2Id: { type: Schema.Types.ObjectId },
  court: String,
  status: String,
  score: String,
  winner: { type: Schema.Types.ObjectId },
  timeScheduled: Date,
  timeFinished: Date,
});

// ----- MODEL -----
const Match = model("User", matchSchema);

export default Match;
