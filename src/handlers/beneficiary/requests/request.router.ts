import { Router } from "express";
import { createRequestForBeneficiaryHandler } from "./create-request/create-request-for-beneficiary.handler";
import { createRequestForBeneficiaryValidation } from "./create-request/validation";
import { getRequestsForBeneficiaryHandler } from "./get-all-request/get-all-request-for-beneficiary.handler";
import { getBeneficiaryRequestById } from "./get-request-by-id/get-request-by-id-beneficiary.handler";
import { getBeneficiaryRequestByIdValidation } from "./get-request-by-id/validation";
import { getRequestsForBeneficiaryValidation } from "./get-all-request/validation";
import { deleteRequestForBeneficiary } from "./delete-request/delete-request.handler";
import { deleteRequestValidation } from "./delete-request/validation";
import { updateRequestForBeneficiaryValidator } from "./update-request/validation";
import { updateRequestForBeneficiary } from "./update-request/update-request-beneficiary.handler";
import { validate } from "../../../middlewares/validate.middleware";

const requestBeneficiaryRouter = Router();

/**
 * @swagger
 * /api/beneficiary/requests:
 *   post:
 *     summary: Create a new request for assistance
 *     tags:
 *       - Beneficiary
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
 *                 example: "Need financial help for medical treatment"
 *               description:
 *                 type: string
 *                 example: "I need assistance for urgent surgery"
 *               category:
 *                 type: string
 *                 enum: [medical, education, food, housing, emergency, other]
 *                 example: "medical"
 *               targetAmount:
 *                 type: number
 *                 example: 3000
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *                 example: "high"
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of supporting documents
 *             required:
 *               - title
 *               - description
 *               - category
 *               - targetAmount
 *     responses:
 *       201:
 *         description: Request created successfully
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
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Beneficiary only
 */
requestBeneficiaryRouter.post("/", createRequestForBeneficiaryValidation, validate, createRequestForBeneficiaryHandler);

/**
 * @swagger
 * /api/beneficiary/requests:
 *   get:
 *     summary: Get all requests created by the authenticated beneficiary
 *     tags:
 *       - Beneficiary
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
 *         description: List of beneficiary's requests
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
 *         description: Forbidden - Beneficiary only
 */
requestBeneficiaryRouter.get("/", getRequestsForBeneficiaryValidation, validate, getRequestsForBeneficiaryHandler);

/**
 * @swagger
 * /api/beneficiary/requests/{requestId}:
 *   get:
 *     summary: Get request details by ID
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
 *                     donations:
 *                       type: array
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Beneficiary only
 *       404:
 *         description: Request not found
 */
requestBeneficiaryRouter.get('/:requestId', getBeneficiaryRequestByIdValidation, validate, getBeneficiaryRequestById);

/**
 * @swagger
 * /api/beneficiary/requests/{requestId}:
 *   put:
 *     summary: Update request information
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
 *               targetAmount:
 *                 type: number
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Beneficiary only
 *       404:
 *         description: Request not found
 */
requestBeneficiaryRouter.put('/:requestId', updateRequestForBeneficiaryValidator, validate, updateRequestForBeneficiary);

/**
 * @swagger
 * /api/beneficiary/requests/{requestId}:
 *   delete:
 *     summary: Delete a request
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
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Beneficiary only
 *       404:
 *         description: Request not found
 */
requestBeneficiaryRouter.delete('/:requestId', deleteRequestValidation, validate, deleteRequestForBeneficiary);

export { requestBeneficiaryRouter };