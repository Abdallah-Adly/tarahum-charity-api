import {  Response } from "express";
import { validationResult } from "express-validator";
import { ApiHandler } from "../../../interfaces/ApiHandler";



export const logoutAuth:ApiHandler<{},{}> = (req, res) => {
    
    res.clearCookie("token");
    res.status(200).json({ message: "Logout process completed successfully" });
};