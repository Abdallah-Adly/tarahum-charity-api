import { Types } from "mongoose";
import { donationStatus } from "../../../../models/donation.model";

export type IGetDonationsByDonorIdParams = {
  donorId: string;
};

export type IGetDonationsByDonorIdResponse = {
  _id: Types.ObjectId;
  money?: number;
  item?: string;
  status: donationStatus;
  date: Date;
  request: {
    _id: Types.ObjectId;
    status: string;
  };
}[];
