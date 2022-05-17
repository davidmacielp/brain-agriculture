export class AppError {
  statusCode: number;

  errorCode: string;

  details: string;

  static notFound(): AppError {
    return new AppError({
      statusCode: 404,
      errorCode: "NOT_FOUND",
      details: `Not found`,
    });
  }

  static notAllowed(): AppError {
    return new AppError({
      statusCode: 403,
      errorCode: "NOT_ALLOWED",
      details: `You're not allowed to do this.`,
    });
  }

  static invalidToken(): AppError {
    return new AppError({
      statusCode: 401,
      errorCode: "INVALID_TOKEN",
      details: "This token is invalid.",
    });
  }

  static emailInUse(email: string): AppError {
    return new AppError({
      statusCode: 409,
      errorCode: "EMAIL_IN_USE",
      details: `The email ${email} is in use.`,
    });
  }

  private constructor({ statusCode, errorCode, details }: AppError) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}
