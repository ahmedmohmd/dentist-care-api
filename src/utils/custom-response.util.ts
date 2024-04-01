import { Response } from "express";

const successResponse = (
  res: Response,
  statusCode: number = 200,
  data: any = null
) => {
  return res.status(statusCode).json({ success: true, data });
};

const errorResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ success: false, message });
};

export default { errorResponse, successResponse };
