import { Types } from "mongoose";
import { donationStatus } from "../../../../models/donation.model";

export type IDonationsByRequestIdParams = {
  requestId: string;
};

export type IDonationsByRequestIdResponse = {
  _id: Types.ObjectId;
  money?: number;
  item?: string;
  status: donationStatus;
  date: Date;
  donor: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
  };
}[];
