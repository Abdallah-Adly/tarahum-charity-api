import { Router } from "express";
import { userAdminRouter } from "./user/user.router";
import { requestAdminRouter } from "./requests/request.router";
import { Role } from "../../models/user.model";
import { isAuthenticated } from "../../middlewares/authenticated-role.middleware";
import { isAuthorized } from "../../middlewares/authorized-role.middleware";
import { donationAdminRouter } from "./donation/donation.router";

const adminRouter = Router();

adminRouter.use(isAuthenticated, isAuthorized(Role.Admin));

adminRouter.use('/users', userAdminRouter);

adminRouter.use('/requests', requestAdminRouter);

adminRouter.use('/donations',donationAdminRouter);

export { adminRouter };