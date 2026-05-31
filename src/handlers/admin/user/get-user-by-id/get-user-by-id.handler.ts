import {  User } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IGetUsersByIdResponse, IRequestGetUserById } from "./types";
import { validationResult } from "express-validator";

export const getUserByIdHandler: ApiHandler<{}, IGetUsersByIdResponse, IRequestGetUserById>
    = async (req, res) => {


        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const response: IGetUsersByIdResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            gender: user.gender,
            avatar: user.avatar,
            address: user.address
        };
        res.status(200).json({ data: response });
    }