import { Types } from "mongoose";


export type ICreateRequestForAdmin = {
    totalMoney: number;
    donor: Types.ObjectId;
    volunteer: Types.ObjectId;
    beneficiary: Types.ObjectId;
};


export type ICreateResponseForAdmin = {
    _id: Types.ObjectId;
};

