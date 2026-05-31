import express from "express";
import { loginValidation } from "./login/validation";
import { loginAuth } from "./login/login.auth";
import { logoutValidation } from "./logout/validation";
import { logoutAuth } from "./logout/logout.auth";
import { registerAuth } from "./register/register.auth";
import { verifyEmailValidation } from "./verify-email/validation";
import { verifyEmailAuth } from "./verify-email/verify-email.auth";
import multer from "multer";
import { storage } from "../../middlewares/upload";
import { validate } from "../../middlewares/validate.middleware";
import { forgotPasswordValidation } from "./forgot-password/forgot-password.validation";
import { forgotPasswordHandler } from "./forgot-password/forgot-password.handler";
import { registerValidation } from "./register/validation";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               avatar:
 *                 type: string
 *                 format: binary
 *             required:
 *               - email
 *               - password
 *               - fullName
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
authRouter.post("/register"
    , registerValidation
    , multer({ storage: storage }).single("avatar")
    , registerAuth);

/**
 * @swagger
 * /api/auth/verify/{email}/{token}:
 *   get:
 *     summary: Verify email address
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: user@example.com
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: verification_token_here
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 */
authRouter.get("/verify/:email/:token", verifyEmailValidation, validate, verifyEmailAuth);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Validation error
 */
authRouter.post("/login", loginValidation, validate, loginAuth);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: User logout
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/logout", logoutValidation, validate, logoutAuth);

/**
 * @swagger
 * /api/auth/forgot/password:
 *   post:
 *     summary: Request password reset
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */
authRouter.post("/forgot/password", forgotPasswordValidation, validate, forgotPasswordHandler);


export { authRouter };