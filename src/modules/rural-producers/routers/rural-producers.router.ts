import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { CreateRuralProducerController } from "../services/create-rural-producer/create-rural-producer.controller";
import { DeleteRuralProducerController } from "../services/delete-rural-producer/delete-rural-producer.controller";
import { ListRuralProducerController } from "../services/list-rural-producers/list-rural-producers.controller";
import { UpdateRuralProducerController } from "../services/update-rural-producer/update-rural-producer.controller";

const ruralProducersRouter = Router();

ruralProducersRouter.use(adminAuthHandler);

ruralProducersRouter.post(
  "/",
  CreateRuralProducerController.validade,
  CreateRuralProducerController.handle
);

ruralProducersRouter.get("/", ListRuralProducerController.handle);

ruralProducersRouter.patch(
  "/:ruralProducerId",
  UpdateRuralProducerController.validate,
  UpdateRuralProducerController.handle
);

ruralProducersRouter.delete(
  "/:ruralProducerId",
  DeleteRuralProducerController.handle
);

export { ruralProducersRouter };
