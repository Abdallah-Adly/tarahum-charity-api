import { Types } from "mongoose";
import { Role, Gender } from "../../../../models/user.model";

export type IRequestCreateUser = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  role: Role;
  gender: Gender;
  avatar?: string;
};


export type IResponseCreateUser = {
  _id: Types.ObjectId;
};