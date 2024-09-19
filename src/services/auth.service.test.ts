// import { describe, expect, it, vi } from 'vitest'
// import bcrypt from '../../__mocks__/bcrypt'
// import jsonwebtoken from '../../__mocks__/jsonwebtoken'
// import prisma from '../../db/__mocks__/prisma'
// import authService from './auth.service'

// vi.mock('bcrypt')
// vi.mock('jsonwebtoken')
// vi.mock('../../db/prisma.ts')

// describe('signUp()', () => {
//   it('Should Return Created User', async () => {
//     const user = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'jg6Xh@example.com',
//       password: 'password',
//       phoneNumber: '1234567890',
//       address: '123 Main St',
//       role: 'PATIENT'
//     }
//     const expectedResult: any = {
//       success: true,
//       data: 'User created successfully',
//       statusCode: 201
//     }
//     prisma.user.create.mockResolvedValue(expectedResult)

//     const createUserResult = await authService.signUp(user)

//     expect(createUserResult).toEqual(expectedResult)
//   })
// })

// describe('signIn()', () => {
//   it('should return a token', async () => {
//     const signInData: any = {
//       email: 'jg6Xh@example.com',
//       password: 'password',
//       role: 'PATIENT'
//     }
//     const expectedResult = 'dummy-token'

//     bcrypt.compare.mockResolvedValue(true as any)
//     jsonwebtoken.sign.mockResolvedValue(expectedResult as any)
//     prisma.user.findUnique.mockResolvedValue({} as any)

//     const signInResult = await authService.signIn(signInData)

//     expect(signInResult).toBe(expectedResult)
//   })

//   it('should throw an error if email is undefined', async () => {
//     const signInData: any = {
//       email: undefined,
//       password: 'password',
//       role: 'PATIENT'
//     }
//     const expectedResult = 'dummy-token'

//     bcrypt.compare.mockResolvedValue(true as any)
//     jsonwebtoken.sign.mockResolvedValue(expectedResult as any)
//     prisma.user.findUnique.mockResolvedValue({} as any)

//     const doSignIn = () => authService.signIn(signInData.email)

//     expect(doSignIn).rejects.toThrow('Invalid email or password!')
//   })

//   it('should throw an error if password is undefined', async () => {
//     const signInData: any = {
//       email: 'jg6Xh@example.com',
//       password: undefined,
//       role: 'PATIENT'
//     }
//     const expectedResult = 'dummy-token'

//     bcrypt.compare.mockResolvedValue(true as any)
//     jsonwebtoken.sign.mockReturnValue(expectedResult as any)
//     prisma.user.findUnique.mockResolvedValue({} as any)

//     const doSignIn = () => authService.signIn(signInData.email)

//     expect(doSignIn).rejects.toThrow('Invalid email or password!')
//   })

//   it('should throw an error if the user is not found', async () => {
//     const signInData: any = {
//       email: 'jg6Xh@example.com',
//       password: 'password',
//       role: 'PATIENT'
//     }
//     const expectedResult = 'dummy-token'

//     bcrypt.compare.mockResolvedValue(true as any)
//     jsonwebtoken.sign.mockResolvedValue(expectedResult as any)
//     prisma.user.findUnique.mockResolvedValue(null as any)

//     const soSignIn = () => authService.signIn(signInData.email)

//     expect(soSignIn).rejects.toThrow(`${signInData.role.toLowerCase()} not found!`)
//   })
// })
