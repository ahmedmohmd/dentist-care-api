import express from 'express'
import dailyDatesController from '../controllers/daily-dates.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Daily Dates
 *   description: API for managing daily dates
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     DailyDate:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: The date of the daily date
 *         available:
 *           type: boolean
 *           description: The availability of the daily date
 *       example:
 *         date: 06:00
 *         available: true
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
 * /daily-dates:
 *   get:
 *     summary: Get all daily dates
 *     tags: [Daily Dates]
 *     description: Get all daily dates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of daily dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyDate'
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
router.get('/', dailyDatesController.getAllDates)

/**
 * @swagger
 * /daily-dates:
 *   post:
 *     summary: Release all daily dates
 *     tags: [Daily Dates]
 *     description: Release all daily dates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: All Dates have been released successfully
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
 *                   example: All Dates have been released successfully
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
router.post('/', dailyDatesController.releaseAllDates)

export default router
