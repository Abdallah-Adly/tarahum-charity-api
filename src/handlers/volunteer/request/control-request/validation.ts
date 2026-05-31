import { param } from "express-validator";

export const approveVolunteerRequestValidation = [
  param("requestId")
    .notEmpty().withMessage("requestId is required")
    .isMongoId().withMessage("Invalid requestId format"),
];
