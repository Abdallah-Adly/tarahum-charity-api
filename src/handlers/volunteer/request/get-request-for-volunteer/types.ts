import { Types } from "mongoose";

export type IResponseGetRequestsForVolunteer = {
  _id: Types.ObjectId;
  totalMoney: number;
  status: string;
  date: Date;
  beneficiary: Types.ObjectId; 
}[];
