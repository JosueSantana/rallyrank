import { Schema, Types, model } from "mongoose";

// ---- INTERFACES -----
export interface IBuddyPair {
  userId: Types.ObjectId,
  buddyId: Types.ObjectId
}

// ----- SCHEMAS -----
const buddyPairSchema = new Schema<IBuddyPair>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  buddyId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

// ----- MODEL -----
const BuddyPair = model("BuddyPair", buddyPairSchema);

export default BuddyPair;
