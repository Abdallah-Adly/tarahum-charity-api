export class CustomError extends Error {
  status = 400;
  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }
  }
}
