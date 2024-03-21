import Role from "./role.types";

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

// type SignInModerator = {
//   email: string;
//   password: string;
//   role: "MODERATOR";
// };

// type SignInPatient = {
//   email: string;
//   password: string;
//   role: "PATIENT";
// };

export { SignIn, SignUp };
