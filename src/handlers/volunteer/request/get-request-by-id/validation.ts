import { param } from "express-validator";

export const getRequestByIdValidation = [
  param("requestId")
    .isMongoId()
    .withMessage("Invalid requestId format"),
];
