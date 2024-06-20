import express from "express";
import enumsConfig from "../../config/enums.config";
import patientsController from "../controllers/patients.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";
import { patientsMiddleware } from "../middleware/patients.middleware";
import uploadMiddleware from "../middleware/upload.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patients routes
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the patient
 *         firstName:
 *           type: string
 *           description: The first name of the patient
 *         lastName:
 *           type: string
 *           description: The last name of the patient
 *         email:
 *           type: string
 *           description: The email of the patient
 *         password:
 *           type: string
 *           description: The password of the patient
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the patient
 *         address:
 *           type: string
 *           description: The address of the patient
 *         role:
 *           type: string
 *           enum: [PATIENT]
 *           description: The role of the patient
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the patient was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the patient was updated
 *
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - role
 *         - phoneNumber
 *         - address
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *         role: PATIENT
 *         createdAt: 2020-01-01T00:00:00.000Z
 *         updatedAt: 2020-01-01T00:00:00.000Z
 *     CreatePatient:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the patient
 *         lastName:
 *           type: string
 *           description: The last name of the patient
 *         email:
 *           type: string
 *           description: The email of the patient
 *         password:
 *           type: string
 *           description: The password of the patient
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the patient
 *         address:
 *           type: string
 *           description: The address of the patient
 *         role:
 *           type: string
 *           enum: [PATIENT]
 *           description: The role of the patient
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - address
 *         - role
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
 *         password: password
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *         role: PATIENT
 *     UpdatePatient:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the patient
 *         lastName:
 *           type: string
 *           description: The last name of the patient
 *         email:
 *           type: string
 *           description: The email of the patient
 *         password:
 *           type: string
 *           description: The password of the patient
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the patient
 *         address:
 *           type: string
 *           description: The address of the patient
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
 *         password: password
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *     Error500:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message
 *           example: Oops! Something went wrong. We're on it!
 *         statusCode:
 *           type: integer
 *           description: The error status code
 *           example: 500
 *         success:
 *           type: boolean
 *           description: The success status
 *           example: false
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     description: Get all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returned all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Patient'
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 200
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Forbidden
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 403
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 */
router.get(
	"/",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
	]),
	patientsController.getAllPatients
);

/**
 * @swagger
 * /patients/{patientId}:
 *   get:
 *     summary: Get a single patient
 *     description: Get a single patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     responses:
 *       200:
 *         description: Returned a single patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 200
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Forbidden
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 403
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Not found
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 */
router.get(
	"/:patientId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
		enumsConfig.UserRole.PATIENT,
	]),
	patientsMiddleware.validatePatientIdParam,
	patientsMiddleware.validatePatientExistance,
	patientsController.getSinglePatient
);

/**
 * @swagger
 * /patients/{patientId}:
 *   patch:
 *     summary: Update a patient
 *     description: Update a patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePatient'
 *     responses:
 *       201:
 *         description: Patient updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: true
 *                 data:
 *                   type: string
 *                   description: The successful message
 *                   example: Patient updated Successfully
 *                 statusCode:
 *                   type: integer
 *                   description: The response status code
 *                   example: 201
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Data is not valid
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Forbidden
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 403
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 */
router.patch(
	"/:patientId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
	patientsMiddleware.validatePatientIdParam,
	patientsMiddleware.validatePatientExistance,
	patientsMiddleware.validateUpdatePatient,
	uploadMiddleware.single("profileImage"),
	patientsController.updatePatient
);

/**
 * @swagger
 * /patients/{patientId}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     responses:
 *       204:
 *         description: Patient deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: true
 *                 data:
 *                   type: string
 *                   description: The successful message
 *                   example: Patient Deleted Successfully
 *                 statusCode:
 *                   type: integer
 *                   description: The success status code*
 *                   example: 204
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Forbidden
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 403
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 */
router.delete(
	"/:patientId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
		enumsConfig.UserRole.PATIENT,
	]),
	patientsMiddleware.validatePatientIdParam,
	patientsMiddleware.validatePatientExistance,
	patientsController.deletePatient
);

export default router;
