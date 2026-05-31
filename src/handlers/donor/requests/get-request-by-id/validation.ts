import { param } from "express-validator";
import mongoose from "mongoose";

export const getDonorRequestByIdValidation = [
  param("requestId")
    .notEmpty()
    .withMessage("requestId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid requestId format"),
];
