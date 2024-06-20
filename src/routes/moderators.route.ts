import express from "express";
import enumsConfig from "../../config/enums.config";
import moderatorsController from "../controllers/moderators.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";
import moderatorsMiddleware from "../middleware/moderators.middleware";
import uploadMiddleware from "../middleware/upload.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Moderators
 *   description: Moderators routes
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Moderator:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the moderator
 *         firstName:
 *           type: string
 *           description: The first name of the moderator
 *         lastName:
 *           type: string
 *           description: The last name of the moderator
 *         email:
 *           type: string
 *           description: The email of the moderator
 *         password:
 *           type: string
 *           description: The password of the moderator
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the moderator
 *         address:
 *           type: string
 *           description: The address of the moderator
 *         role:
 *           type: string
 *           enum: [MODERATOR]
 *           description: The role of the moderator
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the moderator was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the moderator was updated
 *
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - address
 *         - role
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *         role: MODERATOR
 *         createdAt: 2020-01-01T00:00:00.000Z
 *         updatedAt: 2020-01-01T00:00:00.000Z
 *     CreateModerator:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the moderator
 *         lastName:
 *           type: string
 *           description: The last name of the moderator
 *         email:
 *           type: string
 *           description: The email of the moderator
 *         password:
 *           type: string
 *           description: The password of the moderator
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the moderator
 *         address:
 *           type: string
 *           description: The address of the moderator
 *         role:
 *           type: string
 *           enum: [Moderator]
 *           description: The role of the moderator
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
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *         role: Moderator
 *     UpdateModerator:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the moderator
 *         lastName:
 *           type: string
 *           description: The last name of the moderator
 *         email:
 *           type: string
 *           description: The email of the moderator
 *         password:
 *           type: string
 *           description: The password of the moderator
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the moderator
 *         address:
 *           type: string
 *           description: The address of the moderator
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
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
 * /moderators:
 *   get:
 *     summary: Get all moderators
 *     description: Get all moderators
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returned all moderators
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
 *                     $ref: '#/components/schemas/Moderator'
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
	moderatorsController.getAllModerators
);

/**
 * @swagger
 * /moderators/{moderatorId}:
 *   get:
 *     summary: Get a single moderator
 *     description: Get a single moderator
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moderatorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The moderator id
 *     responses:
 *       200:
 *         description: Returned a single moderator
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
 *                   $ref: '#/components/schemas/Moderator'
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
	"/:moderatorId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
	]),
	moderatorsMiddleware.validateModeratorIdParam,
	moderatorsMiddleware.validateModeratorExistance,
	moderatorsController.getSingleModerator
);

/**
 * @swagger
 * /moderators:
 *   post:
 *     summary: Create a new moderator
 *     description: Create a new moderator
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModerator'
 *     responses:
 *       201:
 *         description: Moderator created successfully
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
 *                   example: Moderator created successfully
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 201
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
router.post(
	"/",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
	]),
	moderatorsMiddleware.validateCreateModerator,
	uploadMiddleware.single("profileImage"),
	moderatorsController.createModerator
);

/**
 * @swagger
 * /moderators/{moderatorId}:
 *   patch:
 *     summary: Update an moderator
 *     description: Update an moderator
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moderatorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The moderator id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateModerator'
 *     responses:
 *       201:
 *         description: Moderator updated Successfully
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
 *                   example: Moderator updated Successfully
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
	"/:moderatorId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
	]),
	moderatorsMiddleware.validateModeratorIdParam,
	moderatorsMiddleware.validateModeratorExistance,
	moderatorsMiddleware.validateUpdateModerator,
	uploadMiddleware.single("profileImage"),
	moderatorsController.updateModerator
);

/**
 * @swagger
 * /moderators/{moderatorId}:
 *   delete:
 *     summary: Delete an moderator
 *     description: Delete an moderator
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moderatorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The moderator id
 *     responses:
 *       204:
 *         description: Checkup deleted
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
 *                   example: Moderator Deleted Successfully
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
	"/:moderatorId",
	authMiddleware.authUser,
	checkRoleMiddleware.checkRole([
		enumsConfig.UserRole.ADMIN,
		enumsConfig.UserRole.MODERATOR,
	]),
	moderatorsMiddleware.validateModeratorIdParam,
	moderatorsMiddleware.validateModeratorExistance,
	moderatorsController.deleteModerator
);

export default router;
