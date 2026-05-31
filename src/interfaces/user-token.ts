import { Types } from "mongoose";
import { Role } from "../models/user.model";




export interface UserToken {
    id: Types.ObjectId;
    email: string;
    role: Role;
};