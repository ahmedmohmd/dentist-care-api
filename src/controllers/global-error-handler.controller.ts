import type { ErrorRequestHandler } from "express";
import customResponse from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const globalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err);

  if (err.statusCode !== 500) {
    return customResponse.errorResponse(
      res,
      HttpCode.INTERNAL_SERVER_ERROR,
      err.message
    );
  }

  return customResponse.errorResponse(
    res,
    HttpCode.INTERNAL_SERVER_ERROR,
    "Oops! Something went wrong. We're on it!"
  );
};

export default globalErrorHandler;
