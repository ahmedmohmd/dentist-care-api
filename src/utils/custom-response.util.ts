import { Response } from "express";

/**
 * Function that generates a success response with optional status code and data.
 *
 * @param {Response} res - The response object
 * @param {number} statusCode - The status code (default is 200)
 * @param {any} data - The data to include in the response (default is null)
 * @return {any} The JSON response with success status and data
 */
const successResponse = (
	res: Response,
	statusCode: number = 200,
	data: any = null
) => {
	return res.status(statusCode).json({ success: true, data });
};

/**
 * Creates an error response with the given status code and message.
 *
 * @param {Response} res - the response object
 * @param {number} statusCode - the status code for the response
 * @param {string} message - the error message
 * @return {Object} the error response object
 */
const errorResponse = (res: Response, statusCode: number, message: string) => {
	return res.status(statusCode).json({ success: false, message });
};

export default { errorResponse, successResponse };
