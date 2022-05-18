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

  static adminNotFound(email: string): AppError {
    return new AppError({
      statusCode: 404,
      errorCode: "ADMIN_NOT_FOUND",
      details: `We can't found an admin with email: ${email}`,
    });
  }

  static ruralProducerNotFound(id: string): AppError {
    return new AppError({
      statusCode: 404,
      errorCode: "RURAL_PRODUCER_NOT_FOUND",
      details: `We can't found an ruralProducer with id: ${id}`,
    });
  }

  static notAllowed(): AppError {
    return new AppError({
      statusCode: 403,
      errorCode: "NOT_ALLOWED",
      details: `You're not allowed to do this.`,
    });
  }

  static inconsistencyArea(): AppError {
    return new AppError({
      statusCode: 403,
      errorCode: "AREA_INCONSISTENCY",
      details: `The sum of the useful and non-useful area can't be greater than the total area.`,
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

  static invalidEmailAndPasswordCombination(): AppError {
    return new AppError({
      statusCode: 401,
      errorCode: "INVALID_EMAIL_AND_PASSWORD_COMBINATION",
      details: "Invalid email and password combination.",
    });
  }

  private constructor({ statusCode, errorCode, details }: AppError) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}
