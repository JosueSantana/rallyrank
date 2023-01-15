import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from '../models/User';
import { HydratedDocument } from "mongoose";

const { TOKEN_KEY } = process.env;

export interface AuthRequest extends Request {
  token?: string;
  user?: HydratedDocument<IUser>;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();

    if (token !== undefined && TOKEN_KEY !== undefined) {
      const decoded = jwt.verify(token, TOKEN_KEY);

      const user = await User.findOne({
        _id: decoded,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;

      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
