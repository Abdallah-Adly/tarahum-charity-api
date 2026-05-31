import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { IDonationsByRequestIdResponse, IDonationsByRequestIdParams } from "./types";
import { IUser } from "../../../../models/user.model";

export const getDonationsByRequestId: ApiHandler<{}, IDonationsByRequestIdResponse, IDonationsByRequestIdParams> = async (req, res) => {

    const { requestId } = req.params;

    const donations = await Donation.find({ request: requestId })
        .populate<{ donor: IUser }>("donor", "name address phone gender")
        .select("_id money item status date donor")
        .sort({ date: -1 })

    res.status(200).json({ data: donations });

};

