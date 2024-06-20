import Role from "../types/role.types";

interface UpdateAdmin {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	phoneNumber?: string;
	profileImagePublicId?: string;
	profileImage?: string;
	role: Role;
}

export { UpdateAdmin };
