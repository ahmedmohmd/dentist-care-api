import { RequestHandler } from 'express'
import { CreateCheckup, UpdateCheckup } from '../dto/checkups.dto'
import checkupsService from '../services/checkups.service'
import dailyDatesService from '../services/daily-dates.service'
import cacheUtil from '../utils/cache.util'
import checkCheckupsQueryParams from '../utils/check-checkups-query-params.util'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'
import checkupsValidator from '../validators/checkups.validator'

const getAllCheckups: RequestHandler = async (req, res, next) => {
  try {
    const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res)

    const checkupsFromCache = await cacheUtil.get(`all-checkups:page=${skip}:limit=${take}:order=${sortingOrder}`)

    if (checkupsFromCache) {
      return customResponseUtil.successResponse(res, HttpCode.OK, checkupsFromCache)
    }

    const checkups = await checkupsService.getAllCheckups(skip, take, sortingOrder)

    await cacheUtil.set(`all-checkups:page=${skip}:limit=${take}:order=${sortingOrder}`, checkups)

    return customResponseUtil.successResponse(res, HttpCode.OK, checkups)
  } catch (error) {
    next(error)
  }
}

const getAllPatientCheckups: RequestHandler = async (req, res, next) => {
  try {
    const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res)

    const checkupsFromCache = await cacheUtil.get(`all-checkups:page=${skip}:limit=${take}:order=${sortingOrder}`)

    if (checkupsFromCache) {
      return customResponseUtil.successResponse(res, HttpCode.OK, checkupsFromCache)
    }

    const checkups = await checkupsService.getAllPatientCheckups((req as any).user?.id, skip, take, sortingOrder)

    await cacheUtil.set(`patient-checkups:${skip}:${take}:${sortingOrder}`, checkups)

    return customResponseUtil.successResponse(res, HttpCode.OK, checkups)
  } catch (error) {
    next(error)
  }
}

const getSingleCheckup: RequestHandler<{ checkupId: string }> = async (req, res, next) => {
  try {
    const checkupId = +req.params.checkupId

    const checkupFromCache = await cacheUtil.get(`single-checkup:${checkupId}`)

    if (checkupFromCache) {
      return customResponseUtil.successResponse(res, HttpCode.OK, checkupFromCache)
    }

    const targetCheckup = await checkupsService.getSingleCheckup(checkupId, (req as any).user.id)

    await cacheUtil.set(`single-checkup:${checkupId}`, targetCheckup)

    return customResponseUtil.successResponse(res, HttpCode.OK, targetCheckup)
  } catch (error) {
    next(error)
  }
}

const createCheckup: RequestHandler = async (req: any, res, next) => {
  try {
    // Check Checkup Date
    const availableDates = await dailyDatesService.getAllDates()
    const checkAvailableDate = availableDates.find(
      (item) => item.date === (req.body as CreateCheckup).date && item.available === true
    )

    if (!checkAvailableDate) {
      return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Your Checkup Date is not available!')
    }

    await dailyDatesService.takeDate((req.body as CreateCheckup).date)
    await checkupsService.createCheckup(req.body as CreateCheckup, req.user.id)

    return customResponseUtil.successResponse(res, HttpCode.CREATED, 'The Checkup was created successfully')
  } catch (error) {
    next(error)
  }
}

const updateCheckup: RequestHandler<{ checkupId: string }> = async (req: any, res, next) => {
  try {
    const checkupId = +req.params.checkupId

    const targetCheckup = await checkupsService.getSingleCheckup(checkupId, req.user.id)

    if ((req.body as UpdateCheckup).date) {
      const availableDates = await dailyDatesService.getAllDates()
      const checkAvailableDate = availableDates.find(
        (item) => item.date === (req.body as UpdateCheckup).date && item.available === true
      )

      if (!checkAvailableDate) {
        return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Your Checkup Date is not available!')
      }

      await dailyDatesService.releaseDate(targetCheckup!.date)
      await dailyDatesService.takeDate((req.body as UpdateCheckup).date!)
    }

    await checkupsService.updateCheckup(req.user.id, checkupId, req.body as UpdateCheckup)

    return customResponseUtil.successResponse(res, HttpCode.CREATED, 'Checkup updated successfully')
  } catch (error) {
    next(error)
  }
}

const deleteCheckup: RequestHandler<{ checkupId: string }> = async (req: any, res, next) => {
  try {
    const checkupId = +req.params.checkupId

    const targetCheckup = await checkupsService.getSingleCheckup(checkupId, req.user.id)

    await dailyDatesService.releaseDate(targetCheckup!.date)
    await checkupsService.deleteCheckup(checkupId, req.user.id)

    return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Checkup deleted successfully')
  } catch (error) {
    next(error)
  }
}

export default {
  getAllCheckups,
  getSingleCheckup,
  createCheckup,
  updateCheckup,
  deleteCheckup,
  getAllPatientCheckups
}
