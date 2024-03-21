import Role from "./role.types";

type UpdateAdmin = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  role: Role;
};

export { UpdateAdmin };
