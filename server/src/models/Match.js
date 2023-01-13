import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    
  }
);

const Match = mongoose.model("User", matchSchema);

export default Match;