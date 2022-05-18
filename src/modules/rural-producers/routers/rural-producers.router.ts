import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { CreateRuralProducerController } from "../services/create-rural-producer/create-rural-producer.controller";
import { ListRuralProducerController } from "../services/list-rural-producers/list-rural-producers.controller";

const ruralProducersRouter = Router();

ruralProducersRouter.use(adminAuthHandler);

ruralProducersRouter.post("/", CreateRuralProducerController.handle);
ruralProducersRouter.get("/", ListRuralProducerController.handle);

export { ruralProducersRouter };
