import { Router } from "express";
import { AppError } from "./errors/app.error";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    online: true,
  });
});

router.get("/not-found", (req, res) => {
  throw AppError.notFound();
});

export { router };
