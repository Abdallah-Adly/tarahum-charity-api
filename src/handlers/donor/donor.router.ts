import { Router } from "express";
import { donationDonorRouter } from "./donation/donation.router";
import { requestDonorRouter } from "./requests/request.router";
import { isAuthenticated } from "../../middlewares/authenticated-role.middleware";
import { isAuthorized } from "../../middlewares/authorized-role.middleware";
import { Role } from "../../models/user.model";


const donorRouter = Router();

donorRouter.use(isAuthenticated, isAuthorized(Role.Donor));

donorRouter.use('/requests', requestDonorRouter);

donorRouter.use('/donations',donationDonorRouter);

export { donorRouter };