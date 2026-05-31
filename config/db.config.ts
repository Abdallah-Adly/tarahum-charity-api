import mongoose from "mongoose";
import { environments } from "./environment";

export async function dbConnect() {
  await mongoose.connect(environments.DB_URL);
}
