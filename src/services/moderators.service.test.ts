import { describe, expect, it, vi } from 'vitest'
import prisma from '../../db/__mocks__/prisma'
import { CreateModerator, UpdateModerator } from '../dto/moderators.dto'
import moderatorsService from './moderators.service'

vi.mock('../../db/prisma.ts')

describe('getAllModerators()', () => {
  it('should return an array of moderators', async () => {
    const expectedModerators = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'jg6Xh@example.com',
        password: '12345678',
        phoneNumber: '1234567890',
        address: '123 Main St',
        role: 'MODERATOR',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z'
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'jg6Xh@example.com',
        password: '12345678',
        phoneNumber: '1234567890',
        address: '123 Main St',
        role: 'MODERATOR',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z'
      }
    ]

    prisma.user.findMany.mockResolvedValueOnce(expectedModerators as any)
    const result = await moderatorsService.getAllModerators({
      skip: 0,
      take: 2,
      sortingOrder: 'desc'
    })

    expect(result).toEqual(expectedModerators)
  })
})

describe('getSingleModerator()', () => {
  it('should return a moderator', async () => {
    const moderatorId = 1
    const expectedModerator = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      password: '12345678',
      phoneNumber: '1234567890',
      address: '123 Main St',
      role: 'MODERATOR',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z'
    }

    prisma.user.findUnique.mockResolvedValueOnce(expectedModerator as any)
    const result = await moderatorsService.getSingleModerator(moderatorId)

    expect(result).toEqual(expectedModerator)
  })
})

describe('createModerator()', () => {
  it('should create a moderator', async () => {
    const moderator: CreateModerator = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      password: '12345678',
      phoneNumber: '1234567890',
      address: '123 Main St',
      role: 'MODERATOR'
    }
    const expectedModerator = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      phoneNumber: '1234567890',
      password: '12345678',
      address: '123 Main St',
      role: 'MODERATOR',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z'
    }

    prisma.user.create.mockResolvedValueOnce(expectedModerator as any)
    const result = await moderatorsService.createModerator(moderator)

    expect(result).toEqual(expectedModerator)
  })
})

describe('updateModerator()', () => {
  it('should update a moderator', async () => {
    const moderatorId = 1
    const moderatorData: UpdateModerator = {
      firstName: 'John'
    }
    const expectedModerator = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      password: '12345678',
      phoneNumber: '1234567890',
      address: '123 Main St',
      role: 'MODERATOR',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z'
    }

    prisma.user.update.mockResolvedValueOnce(expectedModerator as any)
    const result = await moderatorsService.updateModerator(moderatorId, moderatorData)

    expect(result).toEqual(expectedModerator)
  })
})

describe('deleteModerator()', () => {
  it('should delete a moderator', async () => {
    const moderatorId = 1
    const expectedModerator = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      password: '12345678',
      phoneNumber: '1234567890',
      address: '123 Main St',
      role: 'MODERATOR',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z'
    }

    prisma.user.delete.mockResolvedValueOnce(expectedModerator as any)
    const result = await moderatorsService.deleteModerator(moderatorId)

    expect(result).toEqual(expectedModerator)
  })
})

describe('getModeratorByEmail()', () => {
  it('should return a moderator', async () => {
    const email = 'jg6Xh@example.com'
    const expectedModerator = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jg6Xh@example.com',
      password: '12345678',
      phoneNumber: '1234567890',
      address: '123 Main St',
      role: 'MODERATOR',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z'
    }

    prisma.user.findUnique.mockResolvedValueOnce(expectedModerator as any)
    const result = await moderatorsService.getModeratorByEmail(email)

    expect(result).toEqual(expectedModerator)
  })
})
