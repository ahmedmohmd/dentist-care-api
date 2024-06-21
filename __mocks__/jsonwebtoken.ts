import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
  mockReset(jsonwebtoken)
})

const jsonwebtoken = mockDeep<typeof import('jsonwebtoken')>()

export default jsonwebtoken
