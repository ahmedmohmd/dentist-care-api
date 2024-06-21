import { z } from 'zod'

const CreatePatient = z.object({
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
  address: z.string().optional()
  // role: z.enum(["PATIENT"]),
})

const UpdatePatient = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, {
      message: 'Your password should be at least 8 characters'
    })
    .max(24, {
      message: 'Your password should be at most 24 characters'
    })
    .optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional()
})

export default { CreatePatient, UpdatePatient }
