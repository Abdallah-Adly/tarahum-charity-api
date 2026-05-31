import { Request, Response } from "express";
import { User } from "../../../models/user.model";
import bcrypt from "bcrypt";
import { ApiHandler } from "../../../interfaces/ApiHandler";
import { IRequestRegister } from "./types";
import { emailService } from "../../../services/email.service";
import { jwtService } from "../../../services/jwt.service"

export const registerAuth: ApiHandler<IRequestRegister, {}>
    = async (req: Request, res: Response) => {

        const { email, password, name, phone, address, role, gender } = req.body;

        const emailUser = await User.findOne({ email });

        if (emailUser) {
            return res.status(400).json({ message: "Email already exists, please login" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const avatar = req.file?.filename;

        const user = await User.create({ email, password: hashPassword, name, phone, address, role, gender, avatar });

        const savedUser = await user.save();

        const token = jwtService.createToken({ id: savedUser.id, email: savedUser.email, role: savedUser.role });

        await emailService.sendEmailVerificationLink(email, token);

        res.status(201).json({ message: "Registration process completed successfully" });
    };