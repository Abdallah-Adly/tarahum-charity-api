import { Router } from "express";
import { getAllRequestsForDonorHandler } from "./get-requests/get-requests-for-donor.handler";
import { getDonorRequestByIdHandler } from "./get-request-by-id/get-request-for-donor-by-id.handler";
import { getRequestsValidation } from "./get-requests/validation";
import { validate } from "../../../middlewares/validate.middleware";

const requestDonorRouter = Router();

/**
 * @swagger
 * /api/donor/requests:
 *   get:
 *     summary: Get all available requests for donor
 *     tags:
 *       - Donor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, completed]
 *         description: Filter by request status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high, urgent]
 *         description: Filter by priority level
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
 *         description: Sort field (e.g., createdAt, targetAmount)
 *     responses:
 *       200:
 *         description: List of all available requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 requests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       targetAmount:
 *                         type: number
 *                       raisedAmount:
 *                         type: number
 *                       status:
 *                         type: string
 *                       priority:
 *                         type: string
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Donor only
 */
requestDonorRouter.get("/", getRequestsValidation, validate, getAllRequestsForDonorHandler);

/**
 * @swagger
 * /api/donor/requests/{requestId}:
 *   get:
 *     summary: Get request details by ID
 *     tags:
 *       - Donor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Request details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 request:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     category:
 *                       type: string
 *                     targetAmount:
 *                       type: number
 *                     raisedAmount:
 *                       type: number
 *                     status:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     beneficiary:
 *                       type: object
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Donor only
 *       404:
 *         description: Request not found
 */
requestDonorRouter.get("/:requestId", getRequestsValidation, validate, getDonorRequestByIdHandler);

export { requestDonorRouter };