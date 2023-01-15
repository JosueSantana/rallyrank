import mongoose from "mongoose";
mongoose.set("strictQuery", false); //As per DeprecationWarning

const { MONGO_URI, CONTEXT } = process.env;

if (CONTEXT !== "TEST" && MONGO_URI !== undefined ) {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log("Successfully connected to database.");
    })
    .catch((error) => {
      console.log("Database connection failed. Exiting.");
      console.error(error);
      process.exit(1);
    });
}
