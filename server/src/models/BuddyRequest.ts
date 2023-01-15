import { Schema, model } from "mongoose";

const buddyRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  requesterId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const BuddyRequest = model("BuddyRequest", buddyRequestSchema);

export default BuddyRequest;
