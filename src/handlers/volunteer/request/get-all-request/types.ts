import { Types } from "mongoose";
import { RequestStatus } from "../../../../models/request.model";

export type IResponseGetUnassignedRequests = {
  _id: Types.ObjectId;
  totalMoney: number;
  date: string;
  status: RequestStatus;
  beneficiary: {
    _id: Types.ObjectId;
    name: string;
    gender: string;
    phone: string;
    address: string;
  };
}[];