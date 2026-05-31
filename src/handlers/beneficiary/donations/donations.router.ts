import { Router } from "express";
import { getDonationsByRequestId } from "./get-donation-by-request-id/get-donation-by-request-id-beneficiary.handler";
import { getDonationsByRequestIdValidator } from "./get-donation-by-request-id/validation";
import { validate } from "../../../middlewares/validate.middleware";

const donationBeneficiaryRouter = Router();

/**
 * @swagger
 * /api/beneficiary/donations/{requestId}:
 *   get:
 *     summary: Get all donations received for a specific request
 *     tags:
 *       - Beneficiary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
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
 *     responses:
 *       200:
 *         description: List of donations for the request
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
 *                       donorId:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       donationType:
 *                         type: string
 *                       status:
 *                         type: string
 *                       message:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: number
 *                 totalAmount:
 *                   type: number
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Beneficiary only
 *       404:
 *         description: Request not found
 */
donationBeneficiaryRouter.get('/:requestId', getDonationsByRequestIdValidator, validate, getDonationsByRequestId);

export { donationBeneficiaryRouter };