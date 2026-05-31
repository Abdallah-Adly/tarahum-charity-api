
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { validationResult } from "express-validator";
import { IDonationRequest, IDonationResponse, IDonationParam } from "./types";


export const updateDonation: ApiHandler<IDonationRequest, IDonationResponse, IDonationParam> = async (req, res) => {

    const { donationId } = req.params;

    const { status, money, item } = req.body;

    const donation = await Donation.findByIdAndUpdate(donationId, { status, money, item },
        { new: true }
    ).select("_id ");

    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ data: donation, message: "Donation status updated successfully" });

};
