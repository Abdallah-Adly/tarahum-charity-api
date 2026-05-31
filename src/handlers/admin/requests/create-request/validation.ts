import { body } from "express-validator";

export const createRequestValidation = [
  body("totalMoney")
    .notEmpty().withMessage("totalMoney is required")
    .isNumeric().withMessage("totalMoney must be a number")
    .isFloat({ min: 1 }).withMessage("totalMoney must be greater than 0"),

  body("donor")
    .notEmpty().withMessage("donor is required")
    .isMongoId().withMessage("Invalid donor id"),

  body("volunteer")
    .notEmpty().withMessage("volunteer is required")
    .isMongoId().withMessage("Invalid volunteer id"),

  body("beneficiary")
    .notEmpty().withMessage("beneficiary is required")
    .isMongoId().withMessage("Invalid beneficiary id"),
];
