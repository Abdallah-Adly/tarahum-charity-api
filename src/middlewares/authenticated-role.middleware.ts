import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from "../interfaces/user-token";
import { environments } from "../../config/environment";

export const isAuthenticated: RequestHandler = (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        req.user = <UserToken>jwt.verify(token, environments.SECRET_KEY!);
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authenticated,please login😎" });
    }
};



