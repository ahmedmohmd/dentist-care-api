import { z } from "zod";

const SignIn = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Your password should be at least 8 characters",
    })
    .max(24, {
      message: "Your password should be at most 24 characters",
    }),
  role: z.enum(["ADMIN", "MODERATOR", "PATIENT"]),
});

const SignUp = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Your password should be at least 8 characters",
    })
    .max(24, {
      message: "Your password should be at most 24 characters",
    }),
  phoneNumber: z.string(),
  address: z.string().optional(),
});

export default { SignIn, SignUp };
