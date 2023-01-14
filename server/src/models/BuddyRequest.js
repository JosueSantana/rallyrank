import { Schema, model } from 'mongoose';

const buddyRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    requesterId: { type: Schema.Types.ObjectId },
  }
);

const BuddyRequest = model("BuddyRequest", buddyRequestSchema);

export default BuddyRequest;