import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request, RequestStatus } from "../../../../models/request.model";
import { IUser } from "../../../../models/user.model";
import { IParamsAssignVolunteerToRequest, IResponseAssignVolunteerToRequest } from "./types";

export const assignVolunteerRequestHandler: ApiHandler<{}, IResponseAssignVolunteerToRequest, IParamsAssignVolunteerToRequest>
    = async (req, res) => {

        const { requestId } = req.params;
        const volunteerId = req.user?.id;

        if (!volunteerId) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        const request = await Request.findOne({ _id: requestId, status: RequestStatus.Pending, volunteer: { $exists: false } });
        if (!request) {
            return res.status(404).json({ message: "Request not found or already assigned" });
        }

        request.volunteer = volunteerId;

        await request.save();


        await request.populate<{ volunteer: IUser }>("volunteer", "_id name gender phone address");


        res.status(200).json({
            data: {
                _id: request._id, }, message: "Volunteer assigned successfully"
        });

    };