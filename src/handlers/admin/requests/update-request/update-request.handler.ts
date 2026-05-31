import { Request } from "../../../../models/request.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IUpdateRequest, IParamsUpdateRequest, IResponseUpdateRequest } from "./types";


export const updateRequestHandler: ApiHandler<IUpdateRequest, IResponseUpdateRequest, IParamsUpdateRequest>
    = async (req, res) => {

        const { requestId } = req.params;
        const updateData = await Request.findByIdAndUpdate(requestId, req.body, {
            new: true,
        });

        if (!updateData) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ data: updateData._id, message: "Request updated successfully" });
    }
