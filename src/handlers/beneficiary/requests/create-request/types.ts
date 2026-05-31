import { Types } from "mongoose";

export type ICreateRequestForBeneficiary = {
    totalMoney: number;
};

export type ICreateResponseForBeneficiary = {
    _id: Types.ObjectId;
};