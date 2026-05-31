import { RequestHandler } from "express";
import { Request } from "../../../../models/request.model";
import { IUser } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Types } from "mongoose";
import { IResponseGetRequestByIdAdmin, IParamsGetRequestByIdAdmin } from "./types";


export const getRequestByIdHandler: ApiHandler<{}, IResponseGetRequestByIdAdmin, IParamsGetRequestByIdAdmin>
    = async (req, res) => {
        const { requestId } = req.params;

        const request = await Request.findById({ _id: requestId })
            .populate<{ donor: IUser }>("donor", "_id name gender phone address")
            .populate<{ volunteer: IUser }>("volunteer", "_id name email phone")
            .select("_id totalMoney date status donor volunteer");

        // console.log(request?.toJSON());

        if (!request) {
            return res.status(404).json({ message: "Request not found!" });
        }
        const response: IResponseGetRequestByIdAdmin = {
            _id: request._id,
            totalMoney: request.totalMoney,
            date: request.date.toISOString(),
            status: request.status,
            donor: request.donor ? {
                _id: request.donor._id,
                name: request.donor.name,
                gender: request.donor.gender,
                phone: request.donor.phone,
                address: request.donor.address,
            } : null,
            volunteer: request.donor ? {
                _id: request.volunteer._id,
                name: request.volunteer.name,
                email: request.volunteer.email,
                phone: request.volunteer.phone,
            } : null,
        }
        res.status(200).json({ message: "Success", data: response });

    }