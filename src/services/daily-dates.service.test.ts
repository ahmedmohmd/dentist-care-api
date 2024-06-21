import { describe, expect, it, vi } from 'vitest'
import prisma from '../../db/__mocks__/prisma'
import dailyDatesService from './daily-dates.service'

vi.mock('../../db/prisma.ts')

describe('getAllDates()', () => {
  it('Should Return All Dates', async () => {
    const expectedResult = [
      { id: 1, date: '04:00', available: true },
      { id: 2, date: '06:00', available: true }
    ]

    prisma.dailyDates.findMany.mockResolvedValue(expectedResult as any)
    const dates = await dailyDatesService.getAllDates()

    expect(dates).toEqual(expectedResult)
  })
})

describe('takeDate()', () => {
  it('Should Reset The Date And Make It Unavailable', async () => {
    const date = '04:00'
    const expectedResult = {
      id: 1,
      date: date,
      available: false
    }

    prisma.dailyDates.update.mockResolvedValue(expectedResult as any)
    const takenDate = await dailyDatesService.takeDate(date)

    expect(takenDate).toEqual(expectedResult)
  })
})

describe('releaseDate()', () => {
  it('Should Reset The Date And Make It Available', async () => {
    const date = '04:00'
    const expectedResult = {
      id: 1,
      date: date,
      available: true
    }

    prisma.dailyDates.update.mockResolvedValue(expectedResult as any)
    const releasedDate = await dailyDatesService.releaseDate(date)

    expect(releasedDate).toEqual(expectedResult)
  })
})

describe('releaseAllDates()', () => {
  it('Should Reset All Dates And Make Them Available', async () => {
    const expectedResult = [
      { id: 1, date: '04:00', available: true },
      { id: 2, date: '06:00', available: true }
    ]

    prisma.dailyDates.updateMany.mockResolvedValue(expectedResult as any)
    const releasedDates = await dailyDatesService.releaseAllDates()

    expect(releasedDates).toEqual(expectedResult)
  })
})
