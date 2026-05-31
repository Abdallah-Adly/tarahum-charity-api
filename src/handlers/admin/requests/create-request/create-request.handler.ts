import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import {Request } from "../../../../models/request.model";
import {  ICreateRequestForAdmin, ICreateResponseForAdmin } from "./types";

export const createRequestHandler: ApiHandler<ICreateRequestForAdmin, ICreateResponseForAdmin>
 = async (req, res) => {
    
    const { totalMoney, donor,  volunteer,beneficiary } = req.body;

    const newRequest = new Request({
        totalMoney,
        donor,
        volunteer,
        beneficiary
    });

     await newRequest.save();

    return res.status(201).json({ data: newRequest._id, message: "Request created successfully" });
}

