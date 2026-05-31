import { Types } from "mongoose";

export type IParamsRequestByDonor = {
    userId: string
}
export type IResponseRequestByDonor = {
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
    };
    volunteer: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        phone: string;
    };
}[];