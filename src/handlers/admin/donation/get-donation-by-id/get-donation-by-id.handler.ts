
import { Donation } from "../../../../models/donation.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { validationResult } from "express-validator";
import { IDonationRequest, IDonationResponse } from "./types";
import { IUser } from "../../../../models/user.model";
import { IRequest } from "../../../../models/request.model";

export const getDonationById: ApiHandler<{}, IDonationResponse, IDonationRequest> = async (req, res) => {



    const { donationId } = req.params;

    const donation = await Donation.findById(donationId)
        .populate<{ donor: IUser }>("donor", "name email phone")
        .populate<{ request: IRequest }>("request", "status")
        .select("_id money item status date");

    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ data: donation });

};
