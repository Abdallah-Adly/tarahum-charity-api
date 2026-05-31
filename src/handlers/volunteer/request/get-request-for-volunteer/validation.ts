import { query } from "express-validator";

export const getRequestsForVolunteerValidation = [
  query("status")
    .optional()
    .isIn(["pending"])
    .withMessage("Status must be one of: pending"),
];
