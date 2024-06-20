import { RequestHandler } from "express";
import constantsConfig from "../../config/constants.config";
import { UpdatePatient } from "../dto/patients.dto";
import patientsService from "../services/patients.service";
import cacheUtil from "../utils/cache.util";
import checkCheckupsQueryParams from "../utils/check-checkups-query-params.util";
import cloudinary from "../utils/cloudinary.util";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const getAllPatients: RequestHandler = async (req, res, next) => {
	try {
		const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res);

		const patientsFromCache = await cacheUtil.get(
			`patients:page=${skip}:limit=${take}:order=${sortingOrder}`
		);

		if (patientsFromCache) {
			return customResponseUtil.successResponse(
				res,
				HttpCode.OK,
				patientsFromCache
			);
		}

		const allPatients = await patientsService.getAllPatients({
			skip,
			take,
			sortingOrder,
		});

		await cacheUtil.set(
			`patients:page=${skip}:limit=${take}:order=${sortingOrder}`,
			allPatients
		);

		return customResponseUtil.successResponse(res, HttpCode.OK, allPatients);
	} catch (error) {
		next(error);
	}
};

const getSinglePatient: RequestHandler<{ patientId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const patientId = +req.params.patientId;

		const patientFromCache = await cacheUtil.get(`single-patient:${patientId}`);

		if (patientFromCache) {
			return customResponseUtil.successResponse(
				res,
				HttpCode.OK,
				patientFromCache
			);
		}

		const targetPatient = await patientsService.getSinglePatient(patientId);

		await cacheUtil.set(`single-patient:${patientId}`, targetPatient);

		return customResponseUtil.successResponse(res, HttpCode.OK, targetPatient);
	} catch (error) {
		next(error);
	}
};

const updatePatient: RequestHandler<{ patientId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const patientId = +req.params.patientId;
		const { profileImagePublicId } = req.body as UpdatePatient;
		const { profileImage } = req.file as any;

		if (profileImagePublicId) {
			await cloudinary.uploader.destroy(profileImagePublicId);
		}

		let result: any;

		if (profileImage) {
			result = await cloudinary.uploader.upload(profileImage);
		}

		const patientData = Object.assign({}, req.body, {
			profileImagePublicId: result.public_id || null,
			profileImage: result.secure_url || constantsConfig.defaultProfileImage,
		});

		await patientsService.updatePatient(patientId, patientData);

		return customResponseUtil.successResponse(
			res,
			HttpCode.CREATED,
			"Patient Updated Successfully"
		);
	} catch (error) {
		next(error);
	}
};

const deletePatient: RequestHandler<{ patientId: string }> = async (
	req,
	res,
	next
) => {
	try {
		const patientId = +req.params.patientId;

		await patientsService.deletePatient(patientId);

		return customResponseUtil.successResponse(
			res,
			HttpCode.NO_CONTENT,
			"Patient Deleted Successfully"
		);
	} catch (error) {
		next(error);
	}
};

export default {
	getAllPatients,
	getSinglePatient,
	updatePatient,
	deletePatient,
};
