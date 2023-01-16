import mongoose from "mongoose";

mongoose.set("strictQuery", false); //As per DeprecationWarning

const { CONTEXT } = process.env;
let MONGO_URI: string;

if (CONTEXT !== "TEST") {
  MONGO_URI = process.env.MONGO_URI as string;
}

export default async () => {
  if (MONGO_URI !== undefined) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Successfully connected to database.");
    } catch (error) {
      console.log("Database connection failed. Exiting.");
      console.error(error);
      process.exit(1);
    }
  }
};
