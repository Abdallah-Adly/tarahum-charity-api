import { Types } from "mongoose";

export type IParamsGetDonationByRequestId = {
    requestId: string
};
export type IResponseGetDonationByRequestId = {
    _id: Types.ObjectId;
    money?: number;
    item?: string;
    date: Date;
}[];

export enum DonationType {
  Money = "money",
  Item = "item",
}

export type IQueryDonationByRequestId = {
  type: DonationType;
};