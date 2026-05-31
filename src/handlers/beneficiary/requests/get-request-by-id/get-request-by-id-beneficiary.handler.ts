import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { IResponseGetBeneficiaryRequestId, IParamsGetBeneficiaryRequestId } from "./types";


export const getBeneficiaryRequestById: ApiHandler<{}, IResponseGetBeneficiaryRequestId, IParamsGetBeneficiaryRequestId>
    = async (req, res) => {

        const { requestId } = req.params;

        const request = await Request.findById(requestId)
            .select("_id totalMoney date status");

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        const response: IResponseGetBeneficiaryRequestId = {
            _id: request._id.toString(),
            totalMoney: request.totalMoney,
            date: request.date.toISOString(),
            status: request.status,
        };

        res.status(200).json({ message: "Request found successfully",data: response });

    }