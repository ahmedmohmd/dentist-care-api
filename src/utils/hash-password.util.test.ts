import { describe, expect, it, vi } from 'vitest'
import bcrypt from '../../__mocks__/bcrypt'
import hashPasswordUtil from './hash-password.util'

vi.mock('bcrypt')

describe('encrypt()', () => {
  it('Should call bcrypt.hash() function', () => {
    const plainText = 'password'
    const SALT = 10

    hashPasswordUtil.encrypt(plainText)

    expect(bcrypt.hash).toBeCalled()
    expect(bcrypt.hash).toBeCalledWith(plainText, SALT)
  })
})

describe('check()', () => {
  it('Should call bcrypt.compare() function', () => {
    const inputText = 'password'
    const hashedText = '$2a$10$jE5jCEtq31oP9zgSbx7G0.mN11qF6b5YNhUAy70D/sLNQaP8E0CZG'

    hashPasswordUtil.check(inputText, hashedText)

    expect(bcrypt.compare).toBeCalled()
    expect(bcrypt.compare).toBeCalledWith(inputText, hashedText)
  })
})
