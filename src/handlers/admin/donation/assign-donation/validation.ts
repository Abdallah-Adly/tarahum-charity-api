import { body } from "express-validator";

export const createDonationForAdminValidation = [
  body("donorId")
    .notEmpty().withMessage("Donor ID is required")
    .isMongoId().withMessage("Donor ID must be a valid MongoId"),

  body("requestId")
    .notEmpty().withMessage("Request ID is required")
    .isMongoId().withMessage("Request ID must be a valid MongoId"),


  body("money")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Money must be a number greater than 0"),

 
  body("item")
    .optional()
    .isString().withMessage("Item must be a string")
    .notEmpty().withMessage("Item cannot be empty"),


  body().custom((value, { req }) => {
    const { money, item } = req.body;

    if ((!money && !item) || (money && item)) {
      throw new Error("You must provide either money OR item, but not both");
    }
    return true;
  }),
];
