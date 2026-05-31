import { param } from "express-validator";

export const getDonationsByDonorIdValidation = [
  param("donorId")
    .isMongoId()
    .withMessage("Invalid donor ID"),
];
