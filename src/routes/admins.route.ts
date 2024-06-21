import express from 'express'
import enumsConfig from '../../config/enums.config'
import adminController from '../controllers/admins.controller'
import adminsMiddleware from '../middleware/admins.middleware'
import authMiddleware from '../middleware/auth.middleware'
import checkRoleMiddleware from '../middleware/check-role.middleware'
import moderatorsMiddleware from '../middleware/moderators.middleware'
import uploadMiddleware from '../middleware/upload.middleware'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admins routes
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the admin
 *         lastName:
 *           type: string
 *           description: The last name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The password of the admin
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the admin
 *         address:
 *           type: string
 *           description: The address of the admin
 *         role:
 *           type: string
 *           enum: [ADMIN]
 *           description: The role of the admin
 *
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - address
 *         - role
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: jg6Xh@example.com
 *         phoneNumber: 1234567890
 *         address: 123 Main St
 *         role: ADMIN
 *     UpdateAdmin:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the admin
 *         lastName:
 *           type: string
 *           description: The last name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The password of the admin
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the admin
 *         address:
 *           type: string
 *           description: The address of the admin
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
 * /admins/{adminId}:
 *   get:
 *     summary: Get a single admin
 *     description: Get a single admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: Returned a single admin
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
 *                   $ref: '#/components/schemas/Admin'
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
  '/:adminId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.getSingleAdmin
)

/**
 * @swagger
 * /admins/convert-to-admin/{moderatorId}:
 *   post:
 *     summary: Convert moderator to admin
 *     description: Convert moderator to admin
 *     tags: [Admins]
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
 *       201:
 *         description: User converted to Admin Successfully
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
 *                   example: User converted to Admin Successfully
 *                 statusCode:
 *                   type: integer
 *                   description: The response status code
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
 */
router.post(
  '/convert-to-admin/:moderatorId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  moderatorsMiddleware.validateModeratorIdParam,
  moderatorsMiddleware.validateModeratorExistance,
  adminController.convertToAdmin
)

/**
 * @swagger
 * /admins/convert-to-moderator/{adminId}:
 *   post:
 *     summary: Convert Admin to moderator
 *     description: Convert Admin to moderator
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       201:
 *         description: User converted to Moderator Successfully
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
 *                   example: User converted to Moderator Successfully
 *                 statusCode:
 *                   type: integer
 *                   description: The response status code
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
router.post(
  '/convert-to-moderator/:adminId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.convertToModerator
)

/**
 * @swagger
 * /admins/{adminId}:
 *   patch:
 *     summary: Update an admin
 *     description: Update an admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAdmin'
 *     responses:
 *       201:
 *         description: Admin updated Successfully
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
 *                   example: Admin updated Successfully
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
  '/:adminId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminsMiddleware.validateUpdateAdmin,
  uploadMiddleware.single('profileImage'),
  adminController.updateAdmin
)

/**
 * @swagger
 * /admins/{adminId}:
 *   delete:
 *     summary: Delete an admin
 *     description: Delete an admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
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
 *                   example: Admin Deleted Successfully
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
  '/:adminId',
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.deleteAdmin
)

export default router
