import { body, param } from "express-validator";

export const updateUserValidation = [
    param("userId")
        .notEmpty().withMessage("userId is required")
        .isMongoId().withMessage("userId must be a valid MongoId"),

    body("role")
        .notEmpty().withMessage("role is required")
        .isIn(["admin", "donor", "beneficiary", "volunteer"])
        .withMessage("Invalid role value"),
        
    body("name")
        .optional()
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
];
