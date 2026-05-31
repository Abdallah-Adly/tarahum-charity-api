import { cookie } from "express-validator";

export const logoutValidation = [
  cookie("token")
    .notEmpty()
    .withMessage("No token found, you are not logged in"),
];