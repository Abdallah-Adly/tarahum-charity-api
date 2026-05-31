import { Types } from "mongoose";

export type IUpdateRequest = {
    totalMoney?: number;
    status?: string;
    volunteer?: Types.ObjectId;
};

export type IParamsUpdateRequest = {
    requestId: Types.ObjectId;
};
export type IResponseUpdateRequest = {
    _id: Types.ObjectId;
};
