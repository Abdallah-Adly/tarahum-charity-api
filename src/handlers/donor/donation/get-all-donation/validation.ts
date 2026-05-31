import { query } from "express-validator";

export const getAllDonationsForDonorValidation = [
  query("status")
    .optional()
    .isString()
    .withMessage("Status must be a string"),
];
