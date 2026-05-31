import { UserToken as UserToken } from "../src/interfaces/user-token";

declare global {

  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      DB_URL: string;
      DB_NAME: string;
      PORT: string;
      NODE_ENV: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      NODE_ENV: NodeEnv;
    }
  }

  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

export { };