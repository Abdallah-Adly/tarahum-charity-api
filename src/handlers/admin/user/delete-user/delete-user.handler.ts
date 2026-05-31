import { User } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IParamsDeleteUser } from "./types";


export const deleteUserHandler: ApiHandler<{}, {}, IParamsDeleteUser>
    = async (req, res) => {


        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!." })
        }

        res.status(200).json({ message: "User deleted successfully" })

    };