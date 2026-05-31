import { param } from "express-validator";

export const deleteRequestValidation = [
    param("requestId")
        .isMongoId().withMessage("requestId must be a valid MongoId")
        .notEmpty().withMessage("requestId is required"),
];
