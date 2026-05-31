import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request, RequestStatus } from "../../../../models/request.model";
import { IUser } from "../../../../models/user.model";
import { IResponseGetUnassignedRequests } from "./types";


export const getUnassignedRequestsHandler: ApiHandler<{}, IResponseGetUnassignedRequests>
    = async (req, res) => {


        const requests = await Request.find({ volunteer: { $exists: false }, status: RequestStatus.Pending })
            .populate<{ beneficiary: IUser }>("beneficiary", "_id name gender phone address")
            .select("_id totalMoney date status beneficiary");

        if (requests.length === 0) {
            return res.status(404).json({ message: "No unassigned requests found" });
        }

        const response: IResponseGetUnassignedRequests = requests.map(req => ({
            _id: req._id,
            totalMoney: req.totalMoney,
            date: req.date.toISOString(),
            status: req.status,
            beneficiary: {
                _id: req.beneficiary._id ,
                name: req.beneficiary.name ,
                gender: req.beneficiary.gender ,
                phone: req.beneficiary.phone ,
                address: req.beneficiary.address ,
            },
        }));

        res.status(200).json({ data: response, message: "Unassigned requests found" });
    };
