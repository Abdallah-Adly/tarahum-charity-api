import { param } from "express-validator";

export const getBeneficiaryRequestByIdValidation = [
  param("requestId")
    .notEmpty()
    .withMessage("Request ID is required")
    .isMongoId()
    .withMessage("Request ID must be a valid Mongo ID"),
];
