import { IUser } from "../../../../models/user.model";
import { Request, RequestStatus } from "../../../../models/request.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IResponseGetDonorRequestById, IParamsGetDonorRequest } from "./types";
import { validationResult } from "express-validator";




export const getDonorRequestByIdHandler: ApiHandler<{}, IResponseGetDonorRequestById, IParamsGetDonorRequest>
    = async (req, res) => {


        const { requestId } = req.params;

        const request = await Request.findById(requestId)
            .populate<{ beneficiary: IUser }>("beneficiary", "_id name gender phone address")
            .select("_id totalMoney date status");
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }
        const response: IResponseGetDonorRequestById = {
            _id: request._id.toString(),
            totalMoney: request.totalMoney,
            date: request.date.toISOString(),
            status: request.status,
            beneficiary: {
                name: request.beneficiary.name,
                gender: request.beneficiary.gender,
                phone: request.beneficiary.phone,
                address: request.beneficiary.address,
            },
        }
        res.status(200).json({ data: response, message: "Request found" });

    };
