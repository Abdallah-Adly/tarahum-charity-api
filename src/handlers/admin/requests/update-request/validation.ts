import { param, body } from "express-validator";

export const updateRequestValidation = [
  // validate params
  param("requestId")
    .notEmpty().withMessage("requestId is required")
    .isMongoId().withMessage("Invalid requestId format"),

 
  body("totalMoney")
    .optional()
    .isNumeric().withMessage("totalMoney must be a number")
    .isFloat({ min: 1 }).withMessage("totalMoney must be greater than 0"),

  body("status")
    .optional()
    .isIn(["pending", "approved", "completed"]) 
    .withMessage("Invalid status value"),

  body("volunteer")
    .optional()
    .isMongoId().withMessage("Invalid volunteer id"),
];


// type requestStatus = "pending" | "approved" | "completed";