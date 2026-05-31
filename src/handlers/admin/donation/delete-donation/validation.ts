import { param } from "express-validator";

export const deleteDonationValidation = [
  param("donationId")
    .isMongoId()
    .withMessage("Invalid donation ID format"),
];
