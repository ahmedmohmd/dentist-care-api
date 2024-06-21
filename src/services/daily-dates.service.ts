import prisma from '../../db/prisma'

/**
 * Retrieves all daily dates that are available.
 *
 * @return {Array} An array of daily dates that are available
 */
const getAllDates = () => {
  return prisma.dailyDates.findMany({
    where: {
      available: true
    }
  })
}

/**
 * Takes a date and updates the availability in the database.
 *
 * @param {string} date - The date to be updated
 * @return {Promise<any>} The updated data object
 */
const takeDate = (date: string) => {
  return prisma.dailyDates.update({
    where: {
      date: date
    },

    data: {
      available: false
    }
  })
}

/**
 * Updates the release date for a specific daily date in the database.
 *
 * @param {string} date - The date to update.
 * @return {Promise<Prisma.Prisma__DailyDatesClient<Prisma.Prisma__DailyDates>>> The updated daily date object.
 */
const releaseDate = (date: string) => {
  return prisma.dailyDates.update({
    where: {
      date: date
    },

    data: {
      available: true
    }
  })
}

/**
 * Updates all daily dates to be available.
 *
 * @return {Promise<any>} Promise that resolves when all dates are updated.
 */
const releaseAllDates = () => {
  return prisma.dailyDates.updateMany({
    data: {
      available: true
    }
  })
}

export default {
  getAllDates,
  takeDate,
  releaseDate,
  releaseAllDates
}
