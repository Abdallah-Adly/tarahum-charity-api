import { Types } from "mongoose";

export type IResponseGetRequestsAdmin = {
    _id: string;
    totalMoney: number;
    date: string;
    status: string;
    donor: {
        _id: Types.ObjectId;
        name: string;
        gender: string;
        phone: string;
        address: string;
    };
    volunteer: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        phone: string;
    };
    beneficiary: {
        _id: Types.ObjectId;
        name: string;
        gender: string;
        phone: string;
        address: string;
    }
}[];

export type IQueryStatus = {
    status: string;
};