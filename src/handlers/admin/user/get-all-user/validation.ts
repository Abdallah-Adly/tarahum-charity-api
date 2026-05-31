import { query } from "express-validator";

export const getAllUsersValidation = [
  query("role")
    .optional()
    .isIn(["admin", "donor", "beneficiary", "volunteer"]) 
    .withMessage("Invalid role value"),
];
