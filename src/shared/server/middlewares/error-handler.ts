import { CelebrateError } from "celebrate";
import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app.error";

// middleware responsible for capturing all application errors
const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  // Check if the error comes from AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      details: error.details,
    });
  }

  // Check if the error comes from Celebrade
  if (error instanceof CelebrateError) {
    const object: Record<string, unknown> = {};

    error.details.forEach((value, key) => {
      object[key] = value;
    });

    return res.status(400).json({
      errorCode: "VALIDATION_ERROR",
      details: object,
    });
  }

  console.log(error);

  // return internal server error if it's an unknown error
  return res.status(500).json({
    errorCode: "INTERNAL_SERVER_ERROR",
    details: "An internal server error has occurred.",
  });
};

export { errorHandler };
