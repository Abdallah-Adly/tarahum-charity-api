import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { IRequest, Request } from "../../../../models/request.model";
import { IRequestCreateDonationDonor, IResponseCreateDonationDonor } from "./types";



export const createDonationForDonor: ApiHandler<IRequestCreateDonationDonor, IResponseCreateDonationDonor>
 = async (req, res) => {
  const { requestId, money, item } = req.body;

  const donorId = req.user?.id;

  if (!donorId) {
    return res.status(400).json({ message: "Donor not found in request" });
  }

  const requestData = await Request.findById(requestId);
  if (!requestData) {
    return res.status(404).json({ message: "Request not found" });
  }

  const newDonation = new Donation({
    request: requestId,
    donor: donorId,
    money,
    item,
    data: new Date(),
  });

  await newDonation.save();

  const response: IResponseCreateDonationDonor = {
    _id: newDonation._id,
    requestId: newDonation.request,
    donorId: newDonation.donor,
    money: newDonation.money,
    item: newDonation.item,
    date: newDonation.date,
  }

  res.status(200).json({ message: "Donation created successfully", data: response });

};

