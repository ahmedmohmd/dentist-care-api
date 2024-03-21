import Role from "./role.types";

type CreatePatient = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
};

type UpdatePatient = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  role?: Role;
};

export { CreatePatient, UpdatePatient };
