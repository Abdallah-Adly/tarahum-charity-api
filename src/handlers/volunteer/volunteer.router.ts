import { Router } from "express";
import { requestVolunteerRouter } from "./request/request.router";
import { isAuthenticated } from "../../middlewares/authenticated-role.middleware";
import { isAuthorized } from "../../middlewares/authorized-role.middleware";
import { Role } from "../../models/user.model";


const volunteerRouter = Router();

volunteerRouter.use(isAuthenticated, isAuthorized(Role.Volunteer));

volunteerRouter.use('/requests',requestVolunteerRouter);


export { volunteerRouter };