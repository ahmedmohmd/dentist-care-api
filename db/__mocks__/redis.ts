import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import client from '../redis'

beforeEach(() => {
  mockReset(redisClient)
})

const redisClient = mockDeep<typeof client>()

export default redisClient
