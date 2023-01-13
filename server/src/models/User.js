import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { TOKEN_KEY } = process.env;

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
  tokens: [{ token: { type: String, required: true } }],
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
