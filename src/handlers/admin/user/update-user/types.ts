import { Types } from "mongoose";
import { Role } from "../../../../models/user.model";

export type IUpdateRequestUser = {
    rol: Role;
    name: string;
};

export type IUpdateResponseUser = {
    _id: Types.ObjectId;
};

export type IUpdateParamsUser = {
    userId: Types.ObjectId;
};