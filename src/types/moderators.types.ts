import { $Enums } from "@prisma/client";

type Moderator = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
};

type CreateModerator = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: "$Enums.Role";
};

type UpdateModerator = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  role?: $Enums.Role;
};

export { CreateModerator, Moderator, UpdateModerator };
