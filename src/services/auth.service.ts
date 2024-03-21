import prisma from "../../db/db";
import Role from "../types/role.types";
import hashPasswordUtil from "../utils/hash-password.util";
import HttpCode from "../utils/http-status-code.util";
import jwtUtil from "../utils/jwt.util";
import { RequestError } from "../utils/request-error.util";

const signIn = async (email: string, password: string, role: Role) => {
  if (!email || !password) {
    throw new RequestError("Invalid email or password!", HttpCode.BAD_REQUEST);
  }

  const signInStrategy = {
    ADMIN: prisma.admin.findUnique({
      where: {
        email: email,
        role: role,
      },
    }),
    MODERATOR: prisma.moderator.findUnique({
      where: {
        email: email,
        role: role,
      },
    }),
    PATIENT: prisma.patient.findUnique({
      where: {
        email: email,
        role: role,
      },
    }),
  };

  let targetUser = await signInStrategy[role];

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

const signUp = (patientData: any) => {
  return prisma.patient.create({
    data: patientData,
  });
};

export default { signIn, signUp };
