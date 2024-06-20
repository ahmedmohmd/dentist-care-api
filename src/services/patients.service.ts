import constantsConfig from "../../config/constants.config";
import enumsConfig from "../../config/enums.config";
import prisma from "../../db/prisma";
import { CreatePatient, UpdatePatient } from "../dto/patients.dto";
import cloudinary from "../utils/cloudinary.util";
import hashPasswordUtil from "../utils/hash-password.util";

/**
 * Retrieves all patients from the database.
 *
 * @return {Promise<User[]>} An array of user objects representing patients.
 */
const getAllPatients = ({
	skip,
	take,
	sortingOrder,
}: {
	skip: number;
	take: number;
	sortingOrder: "desc" | "asc";
}) => {
	return prisma.user.findMany({
		where: {
			role: enumsConfig.UserRole.PATIENT,
		},

		skip: skip,
		take: take,

		orderBy: {
			createdAt: sortingOrder,
		},
	});
};

/**
 * A function that retrieves a single patient based on the provided patientId.
 *
 * @param {number} patientId - The unique identifier of the patient to retrieve.
 * @return {Promise<User>} A promise that resolves to the user object representing the patient.
 */
const getSinglePatient = (patientId: number) => {
	return prisma.user.findUnique({
		where: {
			id: patientId,
			role: enumsConfig.UserRole.PATIENT,
		},
	});
};

/**
 * Retrieve a patient by their email.
 *
 * @param {string} patientEmail - The email of the patient to retrieve.
 * @return {Promise<User>} The unique user object representing the patient.
 */
const getPatientByEmail = (patientEmail: string) => {
	return prisma.user.findUnique({
		where: {
			role: enumsConfig.UserRole.PATIENT,
			email: patientEmail,
		},
	});
};

/**
 * Creates a new patient using the provided patient data.
 *
 * @param {CreatePatient} patientData - The data needed to create a new patient.
 * @return {Promise<User>} A Promise that resolves to the newly created user.
 */
const createPatient = async (patientData: CreatePatient) => {
	return prisma.user.create({
		data: {
			address: patientData.address,
			firstName: patientData.firstName,
			lastName: patientData.lastName,
			email: patientData.email,
			password: await hashPasswordUtil.encrypt(patientData.password),
			phoneNumber: patientData.phoneNumber,
			role: patientData.role,
			profileImagePublicId: patientData.profileImagePublicId,
			profileImage: patientData.profileImage,
		},
	});
};

/**
 * Updates a patient's information in the database.
 *
 * @param {number} patientId - The ID of the patient to be updated
 * @param {UpdatePatient} patientData - The updated patient data
 * @return {Promise<User>} The updated user object
 */
const updatePatient = (patientId: number, patientData: UpdatePatient) => {
	return prisma.user.update({
		where: {
			id: patientId,
			role: enumsConfig.UserRole.PATIENT,
		},

		data: patientData,
	});
};

/**
 * Deletes a patient with the specified ID.
 *
 * @param {number} patientId - The ID of the patient to delete
 * @return {Promise<any>} A promise that resolves to the deleted patient
 */
const deletePatient = async (patientId: number) => {
	const targetPatient = await getSinglePatient(patientId);

	if (targetPatient?.profileImagePublicId) {
		await cloudinary.uploader.destroy(targetPatient.profileImagePublicId);
	}

	return prisma.user.delete({
		where: {
			id: patientId,
			role: enumsConfig.UserRole.PATIENT,
		},
	});
};

export default {
	getSinglePatient,
	updatePatient,
	deletePatient,
	getAllPatients,
	createPatient,
	getPatientByEmail,
};
