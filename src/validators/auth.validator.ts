import { z } from 'zod'

const signInValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'Your password should be at least 8 characters'
    })
    .max(24, {
      message: 'Your password should be at most 24 characters'
    }),
  role: z.enum(['ADMIN', 'MODERATOR', 'PATIENT'])
})

const signUpValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'Your password should be at least 8 characters'
    })
    .max(24, {
      message: 'Your password should be at most 24 characters'
    }),
  phoneNumber: z.string(),
  address: z.string()
})

export default { signInValidator, signUpValidator }
