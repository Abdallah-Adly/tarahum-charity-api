import { RequestHandler } from "express";
import { Request } from "../../../../models/request.model";
import { Types } from "mongoose";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { validationResult } from "express-validator";
import { IParamsDeleteRequestAdmin } from "./types";



export const deleteRequestHandler: ApiHandler<{}, {}, IParamsDeleteRequestAdmin> = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }

    const { requestId } = req.params;

    const request = await Request.findByIdAndDelete(requestId);

    if (!request) {
        return res.status(404).json({ message: "request not found!." });
    }

    res.status(200).json({ message: "request deleted successfully" });

};