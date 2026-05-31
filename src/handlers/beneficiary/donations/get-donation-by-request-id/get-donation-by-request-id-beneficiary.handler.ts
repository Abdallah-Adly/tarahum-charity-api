import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { Request } from "../../../../models/request.model";
import { IResponseGetDonationByRequestId, IParamsGetDonationByRequestId, IQueryDonationByRequestId } from "./types";


export const getDonationsByRequestId: ApiHandler<{}, IResponseGetDonationByRequestId, IParamsGetDonationByRequestId, IQueryDonationByRequestId>
    = async (req, res) => {


        const { requestId } = req.params;

        const beneficiaryId = req.user?.id;;

        if (!beneficiaryId) {
            return res.status(400).json({ message: "Beneficiary not found in request" });
        }

        const { type } = req.query;

        const requests = await Request.findOne({ _id: requestId, beneficiary: beneficiaryId });

        if (!requests) {
            return res.status(404).json({ message: "Request not found" });
        }

        let donations: IResponseGetDonationByRequestId = [];

        if (type) {
            if (type === "item") {
                donations = await Donation.find({ request: requestId })
                    .select("_id  item  date")
                    .sort({ date: -1 });
            } else if (type === "money") {
                donations = await Donation.find({ request: requestId })
                    .select("_id  money  date")
                    .sort({ date: -1 });
            } else {
                return res.status(400).json({ message: "Invalid type" });
            }
        } else {
            donations = await Donation.find({ request: requestId })
                .select("_id  money  item  date")
                .sort({ date: -1 });
        }

        res.status(200).json({ data: donations });

    }