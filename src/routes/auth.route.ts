import express from 'express'
import authController from '../controllers/auth.controller'
import uploadMiddleware from '../middleware/upload.middleware'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     SignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *       required:
 *         - email
 *         - password
 *         - role
 *       example:
 *         email: jg6Xh@example.com
 *         password: password
 *         role: PATIENT
 *
 *     SignUp:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - address
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
 * tags:
 *   - name: Auth
 *     description: Auth routes
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
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
 *                   type: object
 *                   description: The checkup data
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The checkup token
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0MDkxNjUyfQ
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
 */
router.post('/sign-in', authController.signIn)

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Sign up
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: You are signed up successfully
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
 *                   example: You are signed up successfully
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
 *                   example: User Data is not valid
 *                 statusCode:
 *                   type: integer
 *                   description: The error status code
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   description: The success status
 *                   example: false
 */
router.post(
  '/sign-up',
  // patientsMiddleware.validateCreatePatient,

  uploadMiddleware.single('profileImage'),

  // httpInterceptor(["password"]),
  authController.signUp
)

export default router
