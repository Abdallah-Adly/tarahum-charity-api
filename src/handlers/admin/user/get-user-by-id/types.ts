import { Types } from "mongoose";

export type IRequestGetUserById = {
    userId: Types.ObjectId;
};

export type IGetUsersByIdResponse = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    role: string;
    gender: string;
    avatar?: string;
    address: string
};