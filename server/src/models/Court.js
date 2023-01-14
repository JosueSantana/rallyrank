import mongoose from 'mongoose';

//TODO: Add validation for courtType
//TODO: change geolocation to coordinates, look into geolocation implementation
const courtSchema = new mongoose.Schema(
  {
    courtName: String,
    courtType: String,
    city: String,
    geolocation: String
  }
);

const Court = mongoose.model("User", courtSchema);

export default Court;