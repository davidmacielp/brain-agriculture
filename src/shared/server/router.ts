import { adminsRouter } from "@modules/admins/routers/admins.router";
import { Router } from "express";
import { AppError } from "./errors/app.error";

const router = Router();

router.use("/admins", adminsRouter);

router.get("/", (req, res) => {
  return res.status(200).json({
    online: true,
  });
});

export { router };
