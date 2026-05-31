import { Types } from "mongoose";
import { donationStatus } from "../../../../models/donation.model";

export type IGetAllDonationsQuery = {
  status?: string;
};

export type IGetAllDonationsResponse = {
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
  request: {
    _id: Types.ObjectId;
    status: string;
  };
}[];