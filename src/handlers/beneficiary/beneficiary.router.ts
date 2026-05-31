import { Router } from "express";
import { requestBeneficiaryRouter } from "./requests/request.router";
import { isAuthenticated } from "../../middlewares/authenticated-role.middleware";
import { isAuthorized } from "../../middlewares/authorized-role.middleware";
import { Role } from "../../models/user.model";
import { donationBeneficiaryRouter } from "./donations/donations.router";

const beneficiaryRouter = Router();

beneficiaryRouter.use(isAuthenticated, isAuthorized(Role.Beneficiary));

beneficiaryRouter.use('/requests', requestBeneficiaryRouter);

beneficiaryRouter.use('/donations', donationBeneficiaryRouter);


export { beneficiaryRouter };