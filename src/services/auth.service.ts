import prisma from "../../db/prisma";
import Role from "../types/role.types";
import hashPasswordUtil from "../utils/hash-password.util";
import HttpCode from "../utils/http-status-code.util";
import jwtUtil from "../utils/jwt.util";
import { RequestError } from "../utils/request-error.util";

/**
 * Authenticates a user by their email and password, generating a JWT token upon successful authentication.
 *
 * @param {string} email - the user's email address
 * @param {string} password - the user's password
 * @param {Role} role - the user's role
 * @return {Promise<string>} a JWT token for the authenticated user
 */
const signIn = async (email: string, password: string, role: Role) => {
  if (!email || !password) {
    throw new RequestError("Invalid email or password!", HttpCode.BAD_REQUEST);
  }

  let targetUser = await prisma.user.findUnique({
    where: {
      email: email,
      role: role,
    },
  });

  if (!targetUser) {
    throw new RequestError(
      `${role.toLowerCase()} not found!`,
      HttpCode.NOT_FOUND
    );
  }

  const passwordValidationResult = await hashPasswordUtil.check(
    password,
    targetUser.password
  );

  if (!passwordValidationResult) {
    throw new RequestError(
      `Sorry, ${role.toLowerCase()} Password is Incorrect`,
      HttpCode.NOT_FOUND
    );
  }

  const token = await jwtUtil.generateWebToken(targetUser);

  return token;
};

/**
 * Creates a new user account by signing up with the provided patient data.
 *
 * @param {any} patientData - The data of the patient for creating the account.
 * @return {any} The newly created user data.
 */
const signUp = (patientData: any) => {
  return prisma.user.create({
    data: patientData,
  });
};

export default { signIn, signUp };
