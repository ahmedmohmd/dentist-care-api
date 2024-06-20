import { RequestHandler } from "express";
import constantsConfig from "../../config/constants.config";
import { CreateModerator, UpdateModerator } from "../dto/moderators.dto";
import moderatorsService from "../services/moderators.service";
import cacheUtil from "../utils/cache.util";
import checkCheckupsQueryParams from "../utils/check-checkups-query-params.util";
import cloudinary from "../utils/cloudinary.util";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const getAllModerators: RequestHandler = async (req, res, next) => {
	try {
		const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res);

		const moderatorsFromCache = await cacheUtil.get(
			`moderators:page=${skip}:limit=${take}:order=${sortingOrder}`
		);

		if (moderatorsFromCache) {
			return customResponseUtil.successResponse(
				res,
				HttpCode.OK,
				moderatorsFromCache
			);
		}

		const allModerators = await moderatorsService.getAllModerators({
			skip,
			take,
			sortingOrder,
		});

		await cacheUtil.set(
			`moderators:page=${skip}:limit=${take}:order=${sortingOrder}`,
			allModerators
		);

		return customResponseUtil.successResponse(res, HttpCode.OK, allModerators);
	} catch (error) {
		next(error);
	}
};

const getSingleModerator: RequestHandler<{ moderatorId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const moderatorId = +req.params.moderatorId;

		const moderatorFromCache = await cacheUtil.get(
			`single-moderator:${moderatorId}`
		);

		if (moderatorFromCache) {
			return customResponseUtil.successResponse(
				res,
				HttpCode.OK,
				moderatorFromCache
			);
		}

		const targetModerator = await moderatorsService.getSingleModerator(
			moderatorId
		);

		await cacheUtil.set(`single-moderator:${moderatorId}`, targetModerator);

		return customResponseUtil.successResponse(
			res,
			HttpCode.OK,
			targetModerator
		);
	} catch (error) {
		next(error);
	}
};

const createModerator: RequestHandler = async (req, res, next) => {
	try {
		const { profileImage } = req.file as any;

		let result;

		if (profileImage) {
			result = await cloudinary.uploader.upload(profileImage);
		}

		await moderatorsService.createModerator({
			profileImagePublicId: result?.public_id || null,
			profileImage: result?.secure_url || constantsConfig.defaultProfileImage,
			...req.body,
		});

		return customResponseUtil.successResponse(
			res,
			HttpCode.CREATED,
			"Moderator created successfully"
		);
	} catch (error) {
		next(error);
	}
};

const updateModerator: RequestHandler<{ moderatorId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const moderatorId = +req.params.moderatorId;

		const { profileImagePublicId } = req.body as UpdateModerator;
		const { profileImage } = req.file as any;

		if (profileImagePublicId) {
			await cloudinary.uploader.destroy(profileImagePublicId);
		}

		let result;

		if (profileImage) {
			result = await cloudinary.uploader.upload(profileImage);
		}

		await moderatorsService.updateModerator(moderatorId, {
			profileImagePublicId: result?.public_id || null,
			profileImage: result?.secure_url || constantsConfig.defaultProfileImage,
			...req.body,
		});

		return customResponseUtil.successResponse(
			res,
			HttpCode.CREATED,
			"Moderator Updated Successfully"
		);
	} catch (error) {
		next(error);
	}
};

const deleteModerator: RequestHandler<{ moderatorId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const moderatorId = +req.params.moderatorId;

		await moderatorsService.deleteModerator(moderatorId);

		return customResponseUtil.successResponse(
			res,
			HttpCode.NO_CONTENT,
			"Moderator Deleted Successfully"
		);
	} catch (error) {
		next(error);
	}
};

export default {
	getAllModerators,
	getSingleModerator,
	createModerator,
	updateModerator,
	deleteModerator,
};
