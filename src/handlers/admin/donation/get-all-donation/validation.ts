
import { query } from "express-validator";
import { donationStatus } from "../../../../models/donation.model";

export const getAllDonationsValidation = [
  query("status")
    .optional()
    .isIn(Object.values(donationStatus))
    .withMessage(`status must be one of: ${Object.values(donationStatus).join(", ")}`)
];