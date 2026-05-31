import { query } from "express-validator";

export const getAllRequestsValidation = [
  query("status")
    .optional()
    .isIn(["pending", "approved", "completed"])
    .withMessage("Invalid status value"),
];

