import { Types } from "mongoose";

export type IParamsGetRequestByIdAdmin = {
    requestId: Types.ObjectId;
}


export type IResponseGetRequestByIdAdmin = {
    _id: Types.ObjectId;
    totalMoney: number;
    date: string;
    status: string;
    donor: {
        _id: Types.ObjectId;
        name: string;
        gender: string;
        phone: string;
        address: string;
    } | null;
    volunteer: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        phone: string;
    } | null
};