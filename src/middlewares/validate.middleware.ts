import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CustomValidationError } from "../../error/custom-validation.error";

export const validate: RequestHandler<any, any, any, any> = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    const errorsGroup: Record<string, string[]> = {};

    errors.array().forEach((err: any) => {
      if (errorsGroup[err["path"]]) {
        errorsGroup[err["path"]].push(err["msg"]);
      } else {
        errorsGroup[err["path"]] = [];
      }
    });

    return next(new CustomValidationError(errorsGroup));
  }
};
