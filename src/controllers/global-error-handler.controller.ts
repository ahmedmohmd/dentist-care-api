import type { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";

const globalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
	throw new createHttpError.InternalServerError(
		"Oops! Something went wrong. We're on it!"
	);
};

export default globalErrorHandler;
