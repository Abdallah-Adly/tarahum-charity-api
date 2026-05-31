import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { IGetDonationsByDonorIdResponse, IGetDonationsByDonorIdParams } from "./types";
import { IRequest } from "../../../../models/request.model";


export const getDonationsByDonorId: ApiHandler<{}, IGetDonationsByDonorIdResponse, IGetDonationsByDonorIdParams>
 = async (req, res) => {


    const { donorId } = req.params;

    const donations = await Donation.find({ donor: donorId })
        .populate<{ request: IRequest }>("request", "status")
        .select("_id money item status date request")
        .sort({ date: -1 });

    res.status(200).json({ data: donations });
};
