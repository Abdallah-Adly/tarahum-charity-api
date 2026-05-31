import { User } from "../../../models/user.model";
import bcrypt from "bcrypt";
import { jwtService } from "../../../services/jwt.service";
import { ApiHandler } from "../../../interfaces/ApiHandler";
import { IRequestLogin } from "./types";


export const loginAuth:ApiHandler<IRequestLogin,{}> = async (req, res) => {


    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User does not exist, please register" });

    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });

    }

    const token = jwtService.createToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 6,
        httpOnly: true,
    });

    res.status(200).json({ message: "Login process completed successfully", data:token });
};