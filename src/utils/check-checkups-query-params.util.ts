import { Request, Response } from "express";
import config from "../../config/config";
import customResponseUtil from "./custom-response.util";
import HttpCode from "./http-status-code.util";

const checkCheckupsQueryParams = (req: Request, res: Response): any => {
  const {
    page = "1",
    limit = config.limit.toString(),
    sort = "desc",
  } = req.query;

  const parsedPage = parseInt(page.toString(), 10);
  const parsedLimit = parseInt(limit.toString(), 10);

  if (isNaN(parsedPage) || isNaN(parsedLimit)) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Page and Limit should be numbers"
    );
  }

  if (sort !== "asc" && sort !== "desc") {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Sort parameter should be 'asc' or 'desc'"
    );
  }

  const skip = (parsedPage - 1) * config.limit;
  const sortingOrder = sort === "asc" ? "asc" : "desc";
  const take = parsedLimit || config.limit;

  return { skip, take, sortingOrder };
};

export default checkCheckupsQueryParams;
