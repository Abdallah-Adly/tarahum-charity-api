import { body } from "express-validator";

export const createRequestForBeneficiaryValidation = [
  body("totalMoney")
    .notEmpty()
    .withMessage("totalMoney is required")
    .isNumeric()
    .withMessage("totalMoney must be a number")
    .custom((value) => value > 0)
    .withMessage("totalMoney must be greater than 0"),
];
