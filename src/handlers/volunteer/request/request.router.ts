import { Router } from "express";
import { getUnassignedRequestsHandler } from "./get-all-request/get-all-request.handler";
import { getUnassignedRequestsValidation } from "./get-all-request/validation";
import { getRequestByIdHandler } from "./get-request-by-id/get-request-by-id.handler";
import { getRequestByIdValidation } from "./get-request-by-id/validation";
import { assignVolunteerRequestHandler } from "./control-request/control-request.handler";
import { approveVolunteerRequestValidation } from "./control-request/validation";
import { getRequestsForVolunteerHandler } from "./get-request-for-volunteer/get-request-for-volunteer.handler";
import { getRequestsForVolunteerValidation } from "./get-request-for-volunteer/validation";
import { validate } from "../../../middlewares/validate.middleware";

const requestVolunteerRouter = Router();

/**
 * @swagger
 * /api/volunteer/requests:
 *   get:
 *     summary: Get all unassigned requests available for volunteers
 *     tags:
 *       - Volunteer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, in_progress, completed]
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
 *         description: Sort field (e.g., createdAt, priority)
 *     responses:
 *       200:
 *         description: List of unassigned requests
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
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Volunteer only
 */
requestVolunteerRouter.get('/', getUnassignedRequestsValidation, validate, getUnassignedRequestsHandler);

/**
 * @swagger
 * /api/volunteer/requests/volunteer/requests:
 *   get:
 *     summary: Get all requests assigned to the authenticated volunteer
 *     tags:
 *       - Volunteer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, in_progress, completed]
 *         description: Filter by status
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
 *     responses:
 *       200:
 *         description: List of volunteer's assigned requests
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
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Volunteer only
 */
requestVolunteerRouter.get('/volunteer/requests', getRequestsForVolunteerValidation, validate, getRequestsForVolunteerHandler);

/**
 * @swagger
 * /api/volunteer/requests/{requestId}:
 *   get:
 *     summary: Get request details by ID
 *     tags:
 *       - Volunteer
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
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Volunteer only
 *       404:
 *         description: Request not found
 */
requestVolunteerRouter.get('/:requestId', getRequestByIdValidation, validate, getRequestByIdHandler);

/**
 * @swagger
 * /api/volunteer/requests/{requestId}:
 *   post:
 *     summary: Assign volunteer to request (accept/reject)
 *     tags:
 *       - Volunteer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [accept, reject, complete]
 *                 example: "accept"
 *               notes:
 *                 type: string
 *                 example: "I can help with this request"
 *             required:
 *               - action
 *     responses:
 *       200:
 *         description: Action performed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Volunteer only
 *       404:
 *         description: Request not found
 */
requestVolunteerRouter.post('/:requestId', approveVolunteerRequestValidation, validate, assignVolunteerRequestHandler);

export { requestVolunteerRouter };