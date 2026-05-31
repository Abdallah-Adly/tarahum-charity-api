import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { IRequest, Request } from "../../../../models/request.model";
import { IResponseGetAllDonationsForDonor } from "./types";

export const getAllDonationsForDonor: ApiHandler<{}, IResponseGetAllDonationsForDonor> = async (req, res) => {

    
    const donorId = req.user?.id;

    if (!donorId) {
        return res.status(400).json({ message: "Donor not found in request" });
    }

    const donations = await Donation.find({ donor: donorId })
        .populate<{ request: IRequest }>("request", "_id status totalMoney date")
        .select("_id money item date")
        .sort({ date: -1 });

    if (donations.length === 0) {
        return res.status(404).json({ message: "Donations not found" });
    }

    res.status(200).json({ message: "Donations fetched successfully", data: donations });
};
