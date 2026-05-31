import { param } from "express-validator";

export const getDonationsByRequestIdValidation = [
  param("requestId")
    .isMongoId()
    .withMessage("Invalid request ID"),
];
