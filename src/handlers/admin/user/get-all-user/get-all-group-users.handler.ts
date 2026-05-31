
import { User } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IAllUsersResponse, queryRole } from "./types";
import { validationResult } from "express-validator";

export const getAllUsersHandler: ApiHandler<{}, IAllUsersResponse, {}, queryRole>
    = async (req, res) => {


        const { role } = req.query;
        let user: IAllUsersResponse = [];

        if (!role) {
            user = await User.find()
                .select("_id name email phone role gender");
        } else {
            user = await User.find({ role })
                .select("_id name email phone role gender");
        }
        res.status(200).json({ data: user });

    } 