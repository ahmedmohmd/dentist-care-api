import { z } from "zod";

const CreateCheckup = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  date: z.string(),
  type: z.enum(["EXAMINATION", "CONSULTATION"]).default("EXAMINATION"),
});

const UpdateCheckup = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(),
  type: z.enum(["EXAMINATION", "CONSULTATION"]).default("EXAMINATION"),
});

export default { CreateCheckup, UpdateCheckup };
