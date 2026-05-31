import { body } from "express-validator";
import { Role, Gender } from "../../../models/user.model";


export const registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("phone")
    .notEmpty().withMessage("Phone is required")
    .matches(/^[0-9]{10,15}$/).withMessage("Invalid phone number"),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isString().withMessage("Address must be a string"),

  body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(Object.values(Role)).withMessage("Invalid role"),

  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn(Object.values(Gender)).withMessage("Invalid gender"),

  body("avatar")
    .optional()
    .isString().withMessage("Avatar must be a string"),
];
