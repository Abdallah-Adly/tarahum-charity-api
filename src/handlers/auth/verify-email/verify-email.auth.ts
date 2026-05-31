import { Request, Response } from "express";
import { User } from "../../../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { environments } from "../../../../config/environment";
import { ApiHandler } from "../../../interfaces/ApiHandler";
import { IParamsVerifyEmail } from "./types";

export const verifyEmailAuth: ApiHandler<{}, {}, IParamsVerifyEmail>
  = async (req, res) => {

    const { email, token } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not exists" });
      return;
    }
    jwt.verify(token, environments.SECRET_KEY!);
    if (user.isEmailVerified) {
      res.status(400).json({ message: "email already verified" });
      return;
    }
    user.isEmailVerified = true;
    await user.save();
    res.json({ message: "email verified successfully" });
  };