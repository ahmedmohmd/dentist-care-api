import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
  mockReset(bcrypt)
})

const bcrypt = mockDeep<typeof import('bcryptjs')>()

export default bcrypt
