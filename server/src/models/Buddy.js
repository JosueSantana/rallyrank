import mongoose from 'mongoose';

const buddySchema = new mongoose.Schema(
  {
    
  }
);

const Buddy = mongoose.model("User", buddySchema);

export default Buddy;