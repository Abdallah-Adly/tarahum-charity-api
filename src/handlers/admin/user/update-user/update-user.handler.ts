import { Gender, Role, User } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IUpdateRequestUser, IUpdateResponseUser, IUpdateParamsUser } from "./types";
import { validationResult } from "express-validator";


export const updataUserHandler: ApiHandler<IUpdateRequestUser, IUpdateResponseUser, IUpdateParamsUser>
 = async (req, res) => {


    const { userId } = req.params;
    const updateData = await User.findByIdAndUpdate(userId, req.body, {
        new: true
    });

    if (!updateData) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updateData._id });

}