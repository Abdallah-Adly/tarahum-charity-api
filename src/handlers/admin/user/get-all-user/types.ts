import { Types } from "mongoose";

export type IAllUsersResponse = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    role: string;
    gender?: string;
}[];
export type queryRole = {
    role: string
}