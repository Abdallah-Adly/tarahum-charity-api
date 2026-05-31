import { Types } from "mongoose";

export type IRequestCreateDonationAdmin = {
    donorId: string;
    requestId: string;
    money?: number;
    item?: string;
};


{

}

export type IResponseCreateDonationAdmin = {
    _id: Types.ObjectId;
    requestId: Types.ObjectId;
    donorId: Types.ObjectId;
    money?: number;
    item?: string;
    date: Date;
};