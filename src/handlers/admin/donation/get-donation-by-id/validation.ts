
import { param } from "express-validator";

export const getDonationByIdValidation = [
  param("donationId")
    .isMongoId()
    .withMessage("Invalid donation ID format"),
];