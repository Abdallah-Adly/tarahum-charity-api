import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { IRequest } from "../../../../models/request.model";
import { IResponseGetRequestsForVolunteer } from "./types";

export const getRequestsForVolunteerHandler: ApiHandler<{}, IResponseGetRequestsForVolunteer> =
  async (req, res) => {
    const volunteerId = req.user?.id;
    
    if (!volunteerId) {
        return res.status(404).json({ message: "Volunteer not found" });
    }

    const requests = await Request.find({ volunteer: volunteerId })
        .select("_id totalMoney status date beneficiary")
        .sort({ date: -1 });

    if (requests.length === 0) {
        return res.status(404).json({ message: "No requests found for this volunteer" });
    }

    res.status(200).json({ message: "Requests fetched successfully", data: requests });
};
