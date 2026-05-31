import { body, param } from "express-validator";

export const updateRequestForBeneficiaryValidator = [
  param("requestId")
    .isMongoId().withMessage("Invalid requestId format (must be MongoId)"),

  body("totalMoney")
    .isNumeric().withMessage("totalMoney must be a number")
    .custom((value) => value > 0).withMessage("totalMoney must be greater than 0")
];
