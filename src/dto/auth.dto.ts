import Role from "../types/role.types";

type SignIn = {
  email: string;
  password: string;
  role: Role;
};

type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export { SignIn, SignUp };
