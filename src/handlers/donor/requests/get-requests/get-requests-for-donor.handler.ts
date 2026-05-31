import { RequestHandler } from "express";
import { Request } from "../../../../models/request.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IResponseGetRequests, IQueryStatus } from "./types";
import { validationResult } from "express-validator";


export const getAllRequestsForDonorHandler: ApiHandler<{}, IResponseGetRequests, {}, IQueryStatus>
    = async (req, res) => {

        const { status } = req.query;

        let requests: IResponseGetRequests = [];
        if (status === "pending" || status === "approved") {
            requests = await Request.find({ status }).populate("beneficiary", "_id name gender phone address")
                .select("_id totalMoney date status");
        } else {
            requests = await Request.find().populate("beneficiary", "_id name gender phone address")
                .select("_id totalMoney date status");
        }
        res.status(200).json({ data: requests });

    };

