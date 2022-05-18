import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { CreateRuralProducerController } from "../services/create-rural-producer/create-rural-produter.controller";

const ruralProducersRouter = Router();

ruralProducersRouter.use(adminAuthHandler);

ruralProducersRouter.post("/", CreateRuralProducerController.handle);

export { ruralProducersRouter };
