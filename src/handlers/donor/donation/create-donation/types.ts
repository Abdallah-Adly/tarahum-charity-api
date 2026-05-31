import { Types } from "mongoose";

export type IRequestCreateDonationDonor = {
  requestId: string;
  money?: number;
  item?: string;
};


export type IResponseCreateDonationDonor = {
  _id: Types.ObjectId;
  requestId: Types.ObjectId;
  donorId: Types.ObjectId;
  money?: number;
  item?: string;
  date: Date;
};