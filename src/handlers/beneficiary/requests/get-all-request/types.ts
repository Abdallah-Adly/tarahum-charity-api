import { Types } from "mongoose";

export type IResponseRequestByUser = {
    _id: Types.ObjectId;
    totalMoney: number;
    date: string;
    status: string;
}[];