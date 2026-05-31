import { Router } from "express";
import { createRequestValidation } from "./create-request/validation";
import { createRequestHandler } from "./create-request/create-request.handler";
import { getAllRequestsHandler } from "./get-all-request/get-all-request.handler";
import { getAllRequestsValidation } from "./get-all-request/validation";
import { deleteRequestHandler } from "./delete-request/delete-request.handler";
import { deleteRequestValidation } from "./delete-request/validation";
import { getRequestByIdHandler } from "./get-request-by-id/get-request-by-id.handler";
import { getRequestByIdValidation } from "./get-request-by-id/validation";
import { getRequestsByUserHandler } from "./get-request-by-donor/get.requests-by-user.handler";
import { getRequestsByUserValidation } from "./get-request-by-donor/validation";
import { updateRequestHandler } from "./update-request/update-request.handler";
import { updateRequestValidation } from "./update-request/validation";
import { validate } from "../../../middlewares/validate.middleware";

const requestAdminRouter = Router();

/**
 * @swagger
 * /api/admin/requests:
 *   post:
 *     summary: Create a new request
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Medical Assistance Needed"
 *               description:
 *                 type: string
 *                 example: "Need funds for surgery"
 *               category:
 *                 type: string
 *                 example: "medical"
 *               targetAmount:
 *                 type: number
 *                 example: 5000
 *               userId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *                 example: "high"
 *             required:
 *               - title
 *               - description
 *               - category
 *               - targetAmount
 *               - userId
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
requestAdminRouter.post("/", createRequestValidation, validate, createRequestHandler);

/**
 * @swagger
 * /api/admin/requests:
 *   get:
 *     summary: Get all requests with filters
 *     tags:
 *       - Admin
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
 *         description: List of all requests
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
 *         description: Forbidden - Admin only
 */
requestAdminRouter.get("/", getAllRequestsValidation, validate, getAllRequestsHandler);

/**
 * @swagger
 * /api/admin/requests/{requestId}:
 *   get:
 *     summary: Get request by ID
 *     tags:
 *       - Admin
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
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Request not found
 */
requestAdminRouter.get("/:requestId", getRequestByIdValidation, validate, getRequestByIdHandler);

/**
 * @swagger
 * /api/admin/requests/user/{userId}:
 *   get:
 *     summary: Get all requests by a specific user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of user's requests
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
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: User not found
 */
requestAdminRouter.get("/user/:userId", getRequestsByUserValidation, validate, getRequestsByUserHandler);

/**
 * @swagger
 * /api/admin/requests/{requestId}:
 *   put:
 *     summary: Update request information
 *     tags:
 *       - Admin
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, completed]
 *               targetAmount:
 *                 type: number
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Request not found
 */
requestAdminRouter.put("/:requestId", updateRequestValidation, validate, updateRequestHandler);

/**
 * @swagger
 * /api/admin/requests/{requestId}:
 *   delete:
 *     summary: Delete a request
 *     tags:
 *       - Admin
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
 *         description: Request deleted successfully
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Request not found
 */
requestAdminRouter.delete("/:requestId", deleteRequestValidation, validate, deleteRequestHandler);

export { requestAdminRouter };