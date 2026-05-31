import { param } from "express-validator";

export const getUserByIdValidation = [
  param("userId")
    .notEmpty().withMessage("userId is required")
    .isMongoId().withMessage("userId must be a valid MongoId"),
];
