import { Schema, Types, model } from "mongoose";

export type CourtLocation = {
  type: "Point" | "Polygon";
  coordinates: [number];
};

// ----- INTERFACES -----
export interface ICourt {
  courtName: string;
  courtType: string;
  city: string;
  location: CourtLocation;
}

//TODO: Add validation for courtType and location
// ----- SCHEMAS -----
const courtSchema = new Schema<ICourt>({
  courtName: { type: String, required: true, unique: true },
  courtType: String,
  city: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// ----- MODEL -----
const Court = model("Court", courtSchema);

export default Court;
