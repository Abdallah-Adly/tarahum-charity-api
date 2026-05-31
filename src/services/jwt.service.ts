import jwt, { SignOptions } from "jsonwebtoken";
import { UserToken } from "../interfaces/user-token";
import { environments } from "../../config/environment";
function createToken(
  payload: UserToken,
  options: SignOptions = { expiresIn: "1d" }
) {
  const token = jwt.sign(payload, environments.SECRET_KEY!, options);
  return token;
}

export const jwtService = {
  createToken,
};