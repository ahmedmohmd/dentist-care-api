import { RequestHandler } from "express";
import constantsConfig from "../../config/constants.config";
import { SignIn } from "../dto/auth.dto";
import { CreatePatient } from "../dto/patients.dto";
import authService from "../services/auth.service";
import patientsService from "../services/patients.service";
import cloudinary from "../utils/cloudinary.util";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import handleUpload from "../utils/upload-file.util";
import authValidator from "../validators/auth.validator";
import patientsValidator from "../validators/patients.validator";

const signIn: RequestHandler = async (req, res, next) => {
	try {
		const signInDataValidationResult: any = authValidator.SignIn.safeParse(
			req.body
		);

		for (const key of Object.keys(signInDataValidationResult)) {
			if (!signInDataValidationResult[key]) {
				return customResponseUtil.errorResponse(
					res,
					HttpCode.BAD_REQUEST,
					"Email or Password is not Valid, Please try again!"
				);
			}
		}

		const token = await authService.signIn(
			(req.body as SignIn).email,
			(req.body as SignIn).password,
			(req.body as SignIn).role
		);

		if (!token) {
			return customResponseUtil.errorResponse(
				res,
				HttpCode.BAD_REQUEST,
				"Invalid Email or Password."
			);
		}

		return customResponseUtil.successResponse(res, HttpCode.OK, {
			token,
		});
	} catch (error) {
		next(error);
	}
};

const signUp: RequestHandler = async (req, res, next) => {
	try {
		// const { profileImage = "" } = req.file as any;
		const profileImage: any = req.file || "";

		const patientDataValidationResult: any =
			patientsValidator.CreatePatient.safeParse(req.body as CreatePatient);

		if (!patientDataValidationResult.success) {
			const errorMessage = patientDataValidationResult.error.errors
				.map((error: any) => error.message)
				.join("; ");
			return customResponseUtil.errorResponse(
				res,
				HttpCode.BAD_REQUEST,
				`Patient is not valid: [${errorMessage}]`
			);
		}

		const targetPatient = await patientsService.getPatientByEmail(
			req.body.email
		);

		if (targetPatient) {
			return customResponseUtil.errorResponse(
				res,
				HttpCode.BAD_REQUEST,
				"Patient is already Exists!"
			);
		}

		let result: any;

		if (profileImage) {
			result = await handleUpload(profileImage);
		}

		const patientData = Object.assign({}, req.body, {
			profileImagePublicId: result?.public_id || null,
			profileImage: result?.secure_url || constantsConfig.defaultProfileImage,
		});

		await patientsService.createPatient(patientData);

		return customResponseUtil.successResponse(
			res,
			HttpCode.CREATED,
			"Patient created successfully"
		);
	} catch (error) {
		next(error);
	}
};

export default { signIn, signUp };
