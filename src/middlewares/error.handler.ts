import { ErrorRequestHandler } from "express";
import { environments } from "../../config/environment";
import { CustomValidationError } from "../../error/custom-validation.error";
import { CustomError } from "../../error/custom.error";


export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req,
  res,
  next
) => {
  if (environments.NODE_ENV === "development") {
    return res.status(500).send(err);
  }

  console.log(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof CustomValidationError) {
    return res.status(422).json({ errors: err.errors });
  }

  res.status(500).json({ message: "Internal Server Error" });
};
