import { Request } from "../../../../models/request.model";
import { IQueryStatus, IResponseGetRequestsAdmin } from "./types";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { validationResult } from "express-validator";
import { IUser } from "../../../../models/user.model";

export const getAllRequestsHandler: ApiHandler<{}, IResponseGetRequestsAdmin, {}, IQueryStatus>
    = async (req, res) => {

        const { status } = req.query;
        let requests: IResponseGetRequestsAdmin = []

        if (status) {
            requests = await Request.find({ status })
                .populate<{donor:IUser}>("donor", "_id name gender phone address")
                .populate<{volunteer:IUser}>("volunteer", "_id name email phone")
                .populate<{beneficiary:IUser}>("beneficiary", "_id name email phone")
                .select("_id totalMoney date status");
        } else {
            requests = await Request.find()
                .populate<{donor:IUser}>("donor", "_id name gender phone address")
                .populate<{volunteer:IUser}>("volunteer", "_id name email phone")
                .populate<{beneficiary:IUser}>("beneficiary", "_id name email phone")
                .select("_id totalMoney date status");
        }

        res.status(200).json({ data: requests });

    };