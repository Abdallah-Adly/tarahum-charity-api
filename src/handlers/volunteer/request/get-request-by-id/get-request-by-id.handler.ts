import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { IUser } from "../../../../models/user.model";
import { IParamsGetUnassignedRequestById, IResponseGetUnassignedRequestById } from "./types";

export const getRequestByIdHandler: ApiHandler<{}, IResponseGetUnassignedRequestById, IParamsGetUnassignedRequestById>
= async (req, res) => {


    const { requestId } = req.params;

    const request = await Request.findOne({ _id: requestId, volunteer: { $exists: false } })
        .populate<{ beneficiary: IUser }>("beneficiary", "_id name gender phone address")
        .select("_id totalMoney date status beneficiary");

    if (!request) {
        return res.status(404).json({ message: "Unassigned request not found" });
    }

    const response: IResponseGetUnassignedRequestById = {
        _id: request._id,
        totalMoney: request.totalMoney,
        date: request.date.toISOString(),
        status: request.status,
        beneficiary: {
            _id: request.beneficiary._id,
            name: request.beneficiary.name,
            gender: request.beneficiary.gender,
            phone: request.beneficiary.phone,
            address: request.beneficiary.address,
        },
    };

    res.status(200).json({ message: "Unassigned request found" ,data: response });
};