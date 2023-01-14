import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { TOKEN_KEY } = process.env;

//TODO: Add validation for gender, ageRange, level, city, homeCourt, preferredCourtType
//TODO: Expand preferences from user profile
const userProfileSchema = new mongoose.Schema({
  gender: { type: String },
  ageRange: { type: String },
  level: { type: String },
  city: { type: String },
  homeCourt: { type: String },
  preferredCourtType: { type: String },
});

//TODO: Add validation for mode
//TODO: Expand on user settings
const userSettingsSchema = new mongoose.Schema({
  mode: { type: String }
});

//TODO: Add validation for firstName, lastName, email
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowecase: true,
  },
  password: { type: String },
  profileInfo: userProfileSchema,
  settingsInfo: userSettingsSchema,
  tokens: [{ token: { type: String, required: true } }],
  avatar: { type: Buffer }
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, TOKEN_KEY);

  user.tokens = [...user.tokens, { token }];

  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
