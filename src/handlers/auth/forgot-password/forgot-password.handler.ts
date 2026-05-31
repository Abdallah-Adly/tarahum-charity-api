// src/handlers/auth/forgot-password/forgot-password.handler.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../../../models/user.model";
import { emailService } from "../../../services/email.service";
import { generateResetToken } from "../../../../utils/resetToken.util";

export const forgotPasswordHandler = async (req: Request, res: Response) => {


  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
 
    return res.status(200).json({ message: "If this email exists, a reset link has been sent" });
  }

  const { rawToken, hashedToken, expires } = generateResetToken();
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = expires;
  await user.save();


  const resetLink = `${process.env.FRONT_BASE_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

  await emailService.sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below (valid for 15 minutes):</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });

  return res.status(200).json({ message: "If this email exists, a reset link has been sent" });
};
