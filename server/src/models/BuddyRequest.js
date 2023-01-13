import mongoose from 'mongoose';

const buddyRequestSchema = new mongoose.Schema(
  {
    
  }
);

const BuddyRequest = mongoose.model("User", buddyRequestSchema);

export default BuddyRequest;