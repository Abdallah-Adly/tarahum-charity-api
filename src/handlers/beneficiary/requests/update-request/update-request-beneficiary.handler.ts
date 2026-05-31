import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { IRequestUpdateBeneficiary, IPramsUpdateRequestBeneficiary } from "./types";

export const updateRequestForBeneficiary: ApiHandler<IRequestUpdateBeneficiary, {}, IPramsUpdateRequestBeneficiary>
    = async (req, res) => {

        const { requestId } = req.params;

        const { totalMoney } = req.body;

        const request = await Request.findByIdAndUpdate(requestId, { totalMoney }, { new: true });

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request updated successfully", data: request._id });

    };