import { query } from "express-validator";
import { RequestStatus } from "../../../../models/request.model";

export const getUnassignedRequestsValidation = [
  query("status")
    .optional()
    .isIn(Object.values(RequestStatus))
    .withMessage(`status must be one of: ${Object.values(RequestStatus).join(", ")}`),
];
