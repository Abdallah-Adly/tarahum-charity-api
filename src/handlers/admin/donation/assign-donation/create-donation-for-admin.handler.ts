import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { User } from "../../../../models/user.model";
import { Request } from "../../../../models/request.model";
import { IRequestCreateDonationAdmin, IResponseCreateDonationAdmin } from "./types";
import { validationResult } from "express-validator";


export const createDonationForAdmin: ApiHandler<IRequestCreateDonationAdmin, IResponseCreateDonationAdmin>
= async (req, res) => {

    const { donorId, requestId, money } = req.body;

    const donor = await User.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const newDonation = new Donation({
      donor: donorId,
      request: requestId,
      money,
      // item,
      date: new Date(),
    });

    await newDonation.save();

    const response: IResponseCreateDonationAdmin = {
      _id: newDonation._id,
      requestId: newDonation.request,
      donorId: newDonation.donor,
      money: newDonation.money,
      item: newDonation.item,
      date: newDonation.date,
    };
    
    res.status(200).json({ data: response, message: "Donation created successfully" });

};
