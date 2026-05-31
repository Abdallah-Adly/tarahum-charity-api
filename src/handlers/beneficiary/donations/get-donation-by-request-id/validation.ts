import { param, query } from "express-validator";

export const getDonationsByRequestIdValidator = [
  param("requestId")
    .notEmpty().withMessage("requestId is required")
    .isMongoId().withMessage("Invalid requestId format"),

  query("type")
    .optional()
    .isIn(["item", "money"])
    .withMessage("type must be either 'item' or 'money'")
];
