import { query } from "express-validator";
import { RequestStatus } from "../../../../models/request.model";

export const getRequestsForBeneficiaryValidation = [
  query("status")
    .optional()
    .isIn(Object.values(RequestStatus))
    .withMessage(`status must be one of: ${Object.values(RequestStatus).join(", ")}`),

  query("dateFrom")
    .optional()
    .isISO8601()
    .withMessage("dateFrom must be a valid ISO8601 date"),

  query("dateTo")
    .optional()
    .isISO8601()
    .withMessage("dateTo must be a valid ISO8601 date"),
];
