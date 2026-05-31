import { UserToken } from "../src/interfaces/user-token";

declare module "express" {
  interface Request {
    user?: UserToken;
  }
}

export {};