import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { deleteRequestParams } from "./types";


export const deleteRequestForBeneficiary: ApiHandler<{}, {}, deleteRequestParams> = async (req, res) => {

    const { requestId } = req.params;

    const request = await Request.findByIdAndDelete(requestId);

    if (!request) {
        return res.status(404).json({ message: "request not found!." });
    }

    res.status(200).json({ message: "Request deleted successfully" });
};