import Role from "../types/role.types";

type CreatePatient = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: Role;
};

type UpdatePatient = Partial<Omit<CreatePatient, "role">>;

export { CreatePatient, UpdatePatient };
