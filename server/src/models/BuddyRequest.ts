import { Schema, Types, model } from "mongoose";

// ----- INTERFACES -----
export interface IBuddyRequest{
  userId: Types.ObjectId,
  requesterId: Types.ObjectId
}

// ----- SCHEMAS -----
const buddyRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  requesterId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});


// ----- MODEL -----
const BuddyRequest = model("BuddyRequest", buddyRequestSchema);

export default BuddyRequest;
