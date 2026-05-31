import { body } from "express-validator";

export const createUserValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string"),

  body("phone")
    .notEmpty().withMessage("Phone is required")
    .isMobilePhone("any").withMessage("Invalid phone number"),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isString().withMessage("Address must be a string"),

  body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["admin", "donor", "beneficiary", "volunteer"]) 
    .withMessage("Invalid role value"),

  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn(["male", "female"]) 
    .withMessage("Invalid gender value"),

  body("avatar")
    .optional()
    .isURL().withMessage("Avatar must be a valid URL"),
];
