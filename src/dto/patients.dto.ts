import Role from "../types/role.types";

type CreatePatient = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	address: string;
	role: Role;
	profileImagePublicId?: string;
	profileImage?: string;
};

type UpdatePatient = {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	phoneNumber?: string;
	address?: string;
	profileImagePublicId?: string;
};

export { CreatePatient, UpdatePatient };
