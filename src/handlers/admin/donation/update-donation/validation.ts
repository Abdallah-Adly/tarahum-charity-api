import { body, param } from "express-validator";
import { donationStatus } from "../../../../models/donation.model";

export const updateDonationValidation = [
  param("donationId").isMongoId().withMessage("Invalid donation ID"),

  body("status")
    .optional()
    .isIn(Object.values(donationStatus))
    .withMessage("Invalid status"),

  body("money")
    .optional()
    .isNumeric()
    .withMessage("Money must be a number"),

  body("item")
    .optional()
    .isString()
    .withMessage("Item must be a string"),
];
