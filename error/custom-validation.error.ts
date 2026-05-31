import { CustomError } from "./custom.error";


export class CustomValidationError extends CustomError {
  constructor(public errors: Record<string, string[]>) {
    super("Validation Error", 422);
  }
}
