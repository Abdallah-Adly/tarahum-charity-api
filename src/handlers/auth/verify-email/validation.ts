import { param } from "express-validator";

export const verifyEmailValidation = [
  param("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  param("token")
    .notEmpty().withMessage("Token is required"),
];
