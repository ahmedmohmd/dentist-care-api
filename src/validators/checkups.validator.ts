import { z } from "zod";
import enumsConfig from "../../config/enums.config";

const CreateCheckup = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  date: z.string(),
  type: z
    .enum([
      enumsConfig.CheckupType.EXAMINATION,
      enumsConfig.CheckupType.CONSULTATION,
    ])
    .default(enumsConfig.CheckupType.EXAMINATION),
});

const UpdateCheckup = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(),
  type: z
    .enum([
      enumsConfig.CheckupType.EXAMINATION,
      enumsConfig.CheckupType.CONSULTATION,
    ])
    .default(enumsConfig.CheckupType.EXAMINATION),
});

export default { CreateCheckup, UpdateCheckup };
