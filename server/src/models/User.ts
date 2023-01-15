import { Schema, Model, Types, model } from "mongoose";
import jwt from "jsonwebtoken";

const { TOKEN_KEY } = process.env;

// ----- INTERFACES -----
export interface IUserProfile {
  gender: string;
  ageRange: string;
  level: string;
  city: string;
  homeCourt: string;
  preferredCourtType: string;
}

export interface IUserSettings {
  mode: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tokens: { token: string, _id: Types.ObjectId}[];
  profileInfo: IUserProfile;
  settingsInfo: IUserSettings;
  avatar: Types.Buffer;
}

export interface IUserMethods {
  generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

// ----- SCHEMAS -----
//TODO: Add validation for gender, ageRange, level, city, homeCourt, preferredCourtType
//TODO: Expand preferences from user profile
const userProfileSchema = new Schema<IUserProfile>({
  gender: { type: String },
  ageRange: { type: String },
  level: { type: String },
  city: { type: String },
  homeCourt: { type: String },
  preferredCourtType: { type: String },
});

//TODO: Add validation for mode
//TODO: Expand on user settings
const userSettingsSchema = new Schema<IUserSettings>({
  mode: { type: String },
});

//TODO: Add validation for firstName, lastName, email
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowecase: true,
  },
  password: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
  profileInfo: userProfileSchema,
  settingsInfo: userSettingsSchema,
  avatar: { type: Buffer },
});

// ----- METHODS -----
userSchema.method("generateAuthToken", async function () {
  const user = this;

  if (TOKEN_KEY !== undefined) {
    const token = jwt.sign({ _id: user.id.toString() }, TOKEN_KEY);

    user.tokens = [...user.tokens, { token }];

    await user.save();

    return token;
  }
});

// ----- MODEL -----
const User = model("User", userSchema);

export default User;
