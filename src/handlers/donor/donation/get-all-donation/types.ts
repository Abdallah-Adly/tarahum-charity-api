import { Types } from "mongoose";

export type IResponseGetAllDonationsForDonor = {
  _id: Types.ObjectId;
  money?: number;
  item?: string;
  date: Date;
  request: {
    _id: Types.ObjectId;
    status: string;
    totalMoney: number;
    date: Date;
  } ;
}[];