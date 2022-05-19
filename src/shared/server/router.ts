import { adminsRouter } from "@modules/admins/routers/admins.router";
import { dashboardRouter } from "@modules/admins/routers/dashboard.router";
import { culturesRouter } from "@modules/cultures/routers/cultures.router";
import { ruralProducersRouter } from "@modules/rural-producers/routers/rural-producers.router";
import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.status(200).json({ online: true }));

router.use("/admins", adminsRouter);
router.use("/admins/dashboard", dashboardRouter);
router.use("/rural-producers", ruralProducersRouter);
router.use("/cultures", culturesRouter);

export { router };
