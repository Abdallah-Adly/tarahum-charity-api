import fs from "fs/promises";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import dotenv from "dotenv";
import { NodeEnv } from "../interfaces/node.env.enm";
import { environments } from "../../config/environment";

dotenv.config();
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:environments.MAIL_USER,
    pass: environments.MAIL_PASS,
  },
});

async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailOptions: MailOptions = {
    from: environments.MAIL_USER,
    ...options,
  };
  const info = await transporter.sendMail(mailOptions);

  console.log("email sent to ", info.accepted);
}

async function sendEmailVerificationLink(email: string, token: string) {
  const url = `http://localhost:5555/api/auth/verify/${email}/${token}`;

  let emailTemplate = await fs.readFile(
    "./src/templates/email.template.html",
    "utf-8"
  );

  emailTemplate = emailTemplate.replace("{url}", url);


  if (environments.NODE_ENV == NodeEnv.PRODUCTION) {
    await sendEmail({
      to: email,
      subject: "Email verification",
      html: emailTemplate,
    });
  } else {
    console.log(url);
  }
}

  export const emailService = {
    sendEmail,
    sendEmailVerificationLink,
  }
  ;
