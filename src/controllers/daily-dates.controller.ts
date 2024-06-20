import { RequestHandler } from "express";
import dailyDatesService from "../services/daily-dates.service";
import cacheUtil from "../utils/cache.util";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const getAllDates: RequestHandler = async (req, res, next) => {
	try {
		const allDatesFromCache = await cacheUtil.get("all-dates");

		if (allDatesFromCache) {
			return customResponseUtil.successResponse(
				res,
				HttpCode.OK,
				allDatesFromCache
			);
		}

		const allDates = await dailyDatesService.getAllDates();

		await cacheUtil.set("all-dates", allDates);

		return customResponseUtil.successResponse(res, HttpCode.OK, allDates);
	} catch (error) {
		next(error);
	}
};

const releaseAllDates: RequestHandler = async (req, res, next) => {
	try {
		await dailyDatesService.releaseAllDates();

		await cacheUtil.deleteKey("all-dates");

		return customResponseUtil.successResponse(
			res,
			HttpCode.NO_CONTENT,
			"All Dates have been released successfully"
		);
	} catch (error) {
		next(error);
	}
};

export default { getAllDates, releaseAllDates };
