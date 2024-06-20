import { z } from "zod";
import enumsConfig from "../../config/enums.config";

const CreateCheckup = z.object({
  date: z.string(),
  type: z
    .enum([
      enumsConfig.CheckupType.EXAMINATION,
      enumsConfig.CheckupType.CONSULTATION,
    ])
    .default(enumsConfig.CheckupType.EXAMINATION),
});

const UpdateCheckup = z.object({
  date: z.string().optional(),
  type: z
    .enum([
      enumsConfig.CheckupType.EXAMINATION,
      enumsConfig.CheckupType.CONSULTATION,
    ])
    .default(enumsConfig.CheckupType.EXAMINATION),
});

export default { CreateCheckup, UpdateCheckup };
