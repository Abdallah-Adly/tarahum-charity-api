import dotenv from "dotenv";
import { NodeEnv } from "../src/interfaces/node.env.enm";


dotenv.config();

const PORT = process.env.PORT || 1111;

const SECRET_KEY = process.env.SECRET_KEY;

const MAIL_USER = process.env.MAIL_USER;

const MAIL_PASS = process.env.MAIL_PASS;

const DB_NAME = process.env.DB_NAME || "test";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

const DB_URL = `${MONGO_URL}/${DB_NAME}`;

// mongodb://localhost:27017/tarahum => Url mongo

if (!SECRET_KEY) throw new Error("SECRET_KEY is not defined, check .env file");

const NODE_ENV = process.env.NODE_ENV || NodeEnv.DEVELOPMENT;

export const environments = {
  PORT,
  SECRET_KEY,
  MAIL_USER,
  MAIL_PASS,
  DB_URL,
  NODE_ENV,
};