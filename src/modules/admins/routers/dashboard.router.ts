import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { DashboardController } from "../services/dashboad/dashboad.controller";

const dashboardRouter = Router();

dashboardRouter.use(adminAuthHandler);

dashboardRouter.get("/", DashboardController.handle);

export { dashboardRouter };
