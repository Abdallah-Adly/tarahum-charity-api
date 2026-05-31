import { Router } from "express";
import { getAllDonations } from "./get-all-donation/get-all-donation.handler";
import { getAllDonationsValidation } from "./get-all-donation/validation";
import { getDonationByIdValidation } from "./get-donation-by-id/validation";
import { getDonationById } from "./get-donation-by-id/get-donation-by-id.handler";
import { deleteDonation } from "./delete-donation/delete-donation.handler";
import { deleteDonationValidation } from "./delete-donation/validation";
import { updateDonation } from "./update-donation/update-status-donation.handler";
import { updateDonationValidation } from "./update-donation/validation";
import { createDonationForAdminValidation } from "./assign-donation/validation";
import { createDonationForAdmin } from "./assign-donation/create-donation-for-admin.handler";
import { getDonationsByRequestIdValidation } from "./get-donations-by-request/validation";
import { getDonationsByRequestId } from "./get-donations-by-request/get-donation-by-request-id";
import { getDonationsByDonorId } from "./get-donation-by-donor/get-donation-by-donor-id.handler";
import { getDonationsByDonorIdValidation } from "./get-donation-by-donor/validations";
import { validate } from "../../../middlewares/validate.middleware";

const donationAdminRouter = Router();

/**
 * @swagger
 * /api/admin/donations:
 *   post:
 *     summary: Create/Assign a new donation
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
 *               donorId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               requestId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               donationType:
 *                 type: string
 *                 enum: [money, item, service]
 *                 example: "money"
 *               itemDescription:
 *                 type: string
 *                 example: "Medical supplies"
 *             required:
 *               - donorId
 *               - requestId
 *               - amount
 *               - donationType
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
donationAdminRouter.post('/', createDonationForAdminValidation, validate, createDonationForAdmin);

/**
 * @swagger
 * /api/admin/donations:
 *   get:
 *     summary: Get all donations with filters
 *     tags:
 *       - Admin
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
 *         description: List of all donations
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
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
donationAdminRouter.get('/', getAllDonationsValidation, validate, getAllDonations);

/**
 * @swagger
 * /api/admin/donations/requests/{requestId}:
 *   get:
 *     summary: Get all donations for a specific request
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
 *         example: "507f1f77bcf86cd799439012"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
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
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Request not found
 */
donationAdminRouter.get('/requests/:requestId', getDonationsByRequestIdValidation, validate, getDonationsByRequestId);

/**
 * @swagger
 * /api/admin/donations/donors/{donorId}:
 *   get:
 *     summary: Get all donations by a specific donor
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: donorId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of donor's donations
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
 *                 total:
 *                   type: number
 *       400:
 *         description: Invalid donor ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Donor not found
 */
donationAdminRouter.get('/donors/:donorId', getDonationsByDonorIdValidation, validate, getDonationsByDonorId);

/**
 * @swagger
 * /api/admin/donations/{donationId}:
 *   get:
 *     summary: Get donation by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: donationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439013"
 *     responses:
 *       200:
 *         description: Donation details retrieved successfully
 *       400:
 *         description: Invalid donation ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Donation not found
 */
donationAdminRouter.get('/:donationId', getDonationByIdValidation, validate, getDonationById);

/**
 * @swagger
 * /api/admin/donations/{donationId}:
 *   put:
 *     summary: Update donation status
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: donationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439013"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *                 example: "completed"
 *               notes:
 *                 type: string
 *                 example: "Donation received"
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Donation updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Donation not found
 */
donationAdminRouter.put('/:donationId', updateDonationValidation, validate, updateDonation);

/**
 * @swagger
 * /api/admin/donations/{donationId}:
 *   delete:
 *     summary: Delete a donation
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: donationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439013"
 *     responses:
 *       200:
 *         description: Donation deleted successfully
 *       400:
 *         description: Invalid donation ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Donation not found
 */
donationAdminRouter.delete('/:donationId', deleteDonationValidation, validate, deleteDonation);

export { donationAdminRouter };