import { appConfig } from "@config/app.config";
import { RequestHandler } from "express";
import { AppError } from "../errors/app.error";

export const appAuthHandler: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw AppError.notAllowed();

  if (authorization !== appConfig.secretKey) throw AppError.notAllowed();

  return next();
};
