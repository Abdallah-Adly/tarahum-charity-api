import { validationResult } from "express-validator";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Request } from "../../../../models/request.model";
import { ICreateRequestForBeneficiary, ICreateResponseForBeneficiary } from "./types";


export const createRequestForBeneficiaryHandler: ApiHandler<ICreateRequestForBeneficiary, ICreateResponseForBeneficiary>
    = async (req, res) => {

        const { totalMoney } = req.body;
        const beneficiaryId = req.user?.id;

        console.log(req.user);


        if (!beneficiaryId) {
            return res.status(400).json({ message: "Beneficiary not found in request" });
        }


        const newRequest = new Request({
            totalMoney,
            beneficiary: beneficiaryId,
        });

        await newRequest.save();

        res.status(201).json({ data: newRequest._id, message: "Request created successfully" });

    };
