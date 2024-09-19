// import { describe, expect, it, vi } from 'vitest'
// import jsonwebtoken from '../../__mocks__/jsonwebtoken'
// import jwtUtil from './jwt.util'

// vi.mock('jsonwebtoken')

// describe('generateToken()', () => {
//   it('Should call jsonwebtoken.sign() function', () => {
//     const payload: any = {
//       id: 1,
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'jg6Xh@example.com',
//       phoneNumber: '1234567890',
//       address: '123 Main St',
//       role: 'PATIENT'
//     }

//     jwtUtil.generateWebToken(payload)

//     expect(jsonwebtoken.sign).toBeCalled()
//   })
// })

// describe('verifyToken()', () => {
//   it('Should call jsonwebtoken.verify() function', () => {
//     const token = 'dummy-token'

//     jwtUtil.verifyWebToken(token)

//     expect(jsonwebtoken.verify).toBeCalled()
//   })
// })
