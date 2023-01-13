import mongoose from 'mongoose';

const courtSchema = new mongoose.Schema(
  {
    
  }
);

const Court = mongoose.model("User", courtSchema);

export default Court;