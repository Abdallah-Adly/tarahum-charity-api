
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { IResponseRequestByUser } from "./types";
import { validationResult } from "express-validator";
import { Donation } from "../../../../models/donation.model";


export const getRequestsForBeneficiaryHandler: ApiHandler<{}, IResponseRequestByUser>
    = async (req, res) => {

        const beneficiaryId = req.user?.id;
        if (!beneficiaryId) {
            return res.status(400).json({ message: "Beneficiary not found in request" });
        }

        const requests = await Request.find({ beneficiary: beneficiaryId })
            .select("_id totalMoney date status");



        if (requests.length == 0) {
            return res.status(404).json({ message: "This user has no requests!" });
        }

        const response: IResponseRequestByUser = requests.map(req => ({
            _id: req._id,
            totalMoney: req.totalMoney,
            date: req.date.toISOString(),
            status: req.status,
        }))
        res.status(200).json({ data: response, message: "Requests found" });

    };