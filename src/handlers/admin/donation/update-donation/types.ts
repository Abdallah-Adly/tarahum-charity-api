import { Types } from "mongoose";
import { donationStatus } from "../../../../models/donation.model";

export type IDonationParam = {
  donationId: Types.ObjectId;
};

export type IDonationRequest = {
  status?: donationStatus;
  money?: number;
  item?: string;
};

export type IDonationResponse = {
  _id: Types.ObjectId;
};
