import { TokenType } from "@providers/token/contracts/enums/token-type.enum";
import { TokenProvider } from "@providers/token/contracts/interfaces/token.provider";
import { RequestHandler } from "express";
import { container } from "tsyringe";
import { AppError } from "../errors/app.error";

export const adminAuthHandler: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw AppError.invalidToken();

  const token = authorization.split("Bearer ")[1];

  const tokenProvider = container.resolve<TokenProvider>("TokenProvider");

  const tokenPayload = await tokenProvider.getToken(token);

  if (tokenPayload?.type !== TokenType.ADMIN_AUTHENTICATION)
    throw AppError.notAllowed();

  req.userId = tokenPayload.owner;

  next();
};
