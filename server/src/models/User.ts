import { Schema, Model, Types, model, HydratedDocument } from "mongoose";
import jwt from "jsonwebtoken";

const { TOKEN_KEY } = process.env;

// ----- INTERFACES -----
export interface IUserProfile {
  [key: string]: string | Types.Buffer | undefined;
  firstName: string;
  lastName: string;
  gender: string;
  ageRange: string;
  level: string;
  city: string;
  homeCourt: string;
  preferredCourtType: string;
  avatar: Types.Buffer;
}

export interface IUserSettings {
  [key: string]: string | undefined;
  mode: string;
}

type Token = { token: string };

export interface IUserCredentials {
  [key: string]: string | Token[] | undefined;
}

export interface IUser {
  [key: string]:
    | string
    | IUserCredentials
    | IUserProfile
    | IUserSettings
    | Token[]
    | Types.Buffer
    | undefined;
  email: string;
  password: string;
  tokens: Token[];
  profileInfo: IUserProfile;
  settingsInfo: IUserSettings;
}

export interface IUserMethods {
  generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

// ----- SCHEMAS -----
//TODO: Add validation for gender, ageRange, level, city, homeCourt, preferredCourtType
//TODO: Expand preferences from user profile
const userProfileSchema = new Schema<IUserProfile>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String },
  ageRange: { type: String },
  level: { type: String },
  city: { type: String },
  homeCourt: { type: String },
  preferredCourtType: { type: String },
  avatar: { type: Buffer },
});

//TODO: Add validation for mode
//TODO: Expand on user settings
const userSettingsSchema = new Schema<IUserSettings>({
  mode: { type: String },
});

//TODO: Add validation for firstName, lastName, email
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
});

// ----- METHODS -----
userSchema.method("generateAuthToken", async function () {
  const user: HydratedDocument<IUser> = this;

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
