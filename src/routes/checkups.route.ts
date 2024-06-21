import express from 'express'

import enumsConfig from '../../config/enums.config'
import checkupsController from '../controllers/checkups.controller'
import authMiddleware from '../middleware/auth.middleware'
import checkRoleMiddleware from '../middleware/check-role.middleware'
import { checkupsMiddleware } from '../middleware/checkups.middleware'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Checkups
 *     description: The checkups managing API
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Checkup:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The checkup ID
 *         date:
 *           type: string
 *           description: The date of the checkup
 *         type:
 *           type: string
 *           enum: [EXAMINATION, CONSULTATION]
 *           description: The type of the checkup
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         createdAt:
 *           type: string
 *           description: The checkup creation date
 *         updatedAt:
 *           type: string
 *           description: The checkup update date
 *       required:
 *         - date
 *         - type
 *       example:
 *         id: 1
 *         date: 06:00
 *         type: EXAMINATION
 *         createdAt: 2022-01-01
 *         updatedAt: 2022-01-04
 *     CreateCheckup:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: The date of the checkup
 *         type:
 *           type: string
 *           enum: [EXAMINATION, CONSULTATION]
 *           description: The type of the checkup
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *       required:
 *         - date
 *         - type
 *         - userId
 *       example:
 *         date: 06:00
 *         type: EXAMINATION
 *         userId: 1
 *     UpdateCheckup:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: The date of the checkup
 *         type:
 *           type: string
 *           enum: [EXAMINATION, CONSULTATION]
 *           description: The type of the checkup
 *       example:
 *         date: 07:00
 *         type: EXAMINATION
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
 * /checkups/all:
 *   get:
 *     summary: Lists all the checkups
 *     description: Get all checkups
 *     security:
 *       - bearerAuth: []
 *     tags: [Checkups]
 *     responses:
 *       200:
 *         description: The list of the checkups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkup'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get(
  '/all',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN, enumsConfig.UserRole.MODERATOR]),
  checkupsController.getAllCheckups
)

/**
 * @swagger
 * /checkups:
 *   get:
 *     summary: Get Patient Checkups
 *     description: Get Patient Checkups
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Checkups
 *     responses:
 *       200:
 *         description: The list of the checkups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkup'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get(
  '/',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT
  ]),
  checkupsController.getAllCheckups
)

/**
 * @swagger
 * /checkups/{checkupId}:
 *   get:
 *     summary: Get Checkup
 *     description: Get Checkup
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Checkups
 *     parameters:
 *       - in: path
 *         name: checkupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The checkup id
 *     responses:
 *       200:
 *         description: The checkup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkup'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *       404:
 *         description: Checkup not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Checkup Not found
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
  '/:checkupId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT
  ]),
  checkupsMiddleware.validateCheckupIdParam,
  checkupsMiddleware.validateCheckupExistance,
  checkupsController.getSingleCheckup
)

/**
 * @swagger
 * /checkups:
 *   post:
 *     summary: Create Checkup
 *     description: Create Checkup
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Checkups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCheckup'
 *     responses:
 *       200:
 *         description: Checkup updated
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
 *                   oneOf:
 *                     - type: string
 *                     - type: object
 *                   example:
 *                     message: Checkup created successfully
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
 *                   example: Checkup Not found
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
 *
 */
router.post(
  '/',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
  checkupsMiddleware.validateCreateCheckup,
  checkupsController.createCheckup
)

/**
 * @swagger
 * /checkups/{checkupId}:
 *   patch:
 *     summary: Update Checkup
 *     description: Update Checkup
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Checkups
 *     parameters:
 *       - in: path
 *         name: checkupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The checkup id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCheckup'
 *     responses:
 *       201:
 *         description: Checkup updated
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
 *                   oneOf:
 *                     - type: string
 *                     - type: object
 *                   example:
 *                     message: Checkup updated successfully
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
 *                   example: Checkup data is not valid
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
  '/:checkupId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
  checkupsMiddleware.validateCheckupIdParam,
  checkupsMiddleware.validateCheckupExistance,
  checkupsMiddleware.validateUpdateCheckup,
  checkupsController.updateCheckup
)

/**
 * @swagger
 * /checkups/{checkupId}:
 *   delete:
 *     summary: Delete Checkup
 *     description: Delete Checkup
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Checkups
 *     parameters:
 *       - in: path
 *         name: checkupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The checkup id
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
 *                   oneOf:
 *                     - type: string
 *                     - type: object
 *                 example:
 *                   message: Checkup deleted successfully
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
  '/:checkupId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT
  ]),
  checkupsMiddleware.validateCheckupIdParam,
  checkupsMiddleware.validateCheckupExistance,
  checkupsController.deleteCheckup
)

export default router
