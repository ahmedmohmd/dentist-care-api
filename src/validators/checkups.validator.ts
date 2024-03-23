import { z } from "zod";
import config from "../../config/config";

const CreateCheckup = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  date: z.string(),
  type: z
    .enum([config.checkupType.EXAMINATION, config.checkupType.CONSULTATION])
    .default(config.checkupType.EXAMINATION),
});

const UpdateCheckup = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(),
  type: z
    .enum([config.checkupType.EXAMINATION, config.checkupType.CONSULTATION])
    .default(config.checkupType.EXAMINATION),
});

export default { CreateCheckup, UpdateCheckup };
