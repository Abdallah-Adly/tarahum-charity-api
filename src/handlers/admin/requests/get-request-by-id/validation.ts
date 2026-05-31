import { param } from "express-validator";

export const getRequestByIdValidation = [
  param("requestId")
    .notEmpty().withMessage("requestId is required")
    .isMongoId().withMessage("requestId must be a valid MongoId"),
];
