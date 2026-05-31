import { Router } from "express";
import { createDonationForDonor } from "./create-donation/create-donation-for-request.handler";
import { createDonationValidation } from "./create-donation/validation";
import { getAllDonationsForDonorValidation } from "./get-all-donation/validation";
import { getAllDonationsForDonor } from "./get-all-donation/get-all-donation.handler";
import { validate } from "../../../middlewares/validate.middleware";

const donationDonorRouter = Router();

/**
 * @swagger
 * /api/donor/donations:
 *   post:
 *     summary: Create a new donation for a request
 *     tags:
 *       - Donor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               amount:
 *                 type: number
 *                 example: 500
 *               donationType:
 *                 type: string
 *                 enum: [money, item, service]
 *                 example: "money"
 *               itemDescription:
 *                 type: string
 *                 example: "Food supplies for a week"
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, wallet, bank_transfer]
 *                 example: "credit_card"
 *               message:
 *                 type: string
 *                 example: "I want to help this person"
 *             required:
 *               - requestId
 *               - amount
 *               - donationType
 *               - paymentMethod
 *     responses:
 *       201:
 *         description: Donation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 donation:
 *                   type: object
 *       400:
 *         description: Validation error or invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Donor only
 *       404:
 *         description: Request not found
 */
donationDonorRouter.post('/', createDonationValidation, validate, createDonationForDonor);

/**
 * @swagger
 * /api/donor/donations:
 *   get:
 *     summary: Get all donations made by the authenticated donor
 *     tags:
 *       - Donor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         description: Filter by donation status
 *       - in: query
 *         name: donationType
 *         schema:
 *           type: string
 *           enum: [money, item, service]
 *         description: Filter by donation type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (e.g., createdAt, amount)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter donations from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter donations until this date
 *     responses:
 *       200:
 *         description: List of all donations made by donor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 donations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       requestId:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       donationType:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: number
 *                 totalAmount:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Donor only
 */
donationDonorRouter.get('/', getAllDonationsForDonorValidation, validate, getAllDonationsForDonor);

export { donationDonorRouter };