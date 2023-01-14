import { Schema, model } from 'mongoose';


//TODO: Add validation for matchesPlayed
const buddySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    buddyId: { type: Schema.Types.ObjectId },
    matchesPlayed: Number
  }
);

const BuddyPair = model("BuddyPair", buddySchema);

export default BuddyPair;