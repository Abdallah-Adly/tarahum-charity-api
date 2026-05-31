
import crypto from "crypto";

export function generateResetToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");            
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex"); 
  const expires = new Date(Date.now() + 15 * 60 * 1000); 

  return { rawToken, hashedToken, expires };
}
