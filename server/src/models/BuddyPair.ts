import { Schema, model } from "mongoose";

const buddySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  buddyId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const BuddyPair = model("BuddyPair", buddySchema);

export default BuddyPair;
