import { body } from "express-validator";

export const createDonationValidation = [
  body("requestId")
    .notEmpty().withMessage("Request ID is required")
    .isMongoId().withMessage("Request ID must be a valid MongoDB ID"),

  body("money")
    .optional()
    .isFloat({ min: 1 }).withMessage("Money must be a positive number"),

  body("item")
    .optional()
    .isString().withMessage("Item must be a string")
    .isLength({ min: 2 }).withMessage("Item name must be at least 2 characters long"),
];
