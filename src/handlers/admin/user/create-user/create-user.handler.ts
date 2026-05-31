import { Gender, IUser, Role, User } from "../../../../models/user.model";
import bcrypt from "bcrypt";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IRequestCreateUser, IResponseCreateUser } from "./types";
import { validationResult } from "express-validator";





export const createUserHandler: ApiHandler<IRequestCreateUser, IResponseCreateUser> = async (req, res) => {

  const user = new User(req.body);

  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;

  await user.save();

  console.log("success operation");

  res.status(201).json({ data: user._id, message: "User created successfully" });

};  
