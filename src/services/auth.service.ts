import prisma from "../../db/db";
import HttpCode from "../utils/http-status-code.util";
import jwtUtil from "../utils/jwt.util";
import { RequestError } from "../utils/request-error.util";

const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    throw new RequestError("Invalid email or password!", HttpCode.BAD_REQUEST);
  }

  const targetUser = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });

  if (!targetUser) {
    throw new RequestError("User not found!", HttpCode.NOT_FOUND);
  }

  if (password !== targetUser.password) {
    throw new RequestError(
      "Sorry, User Password is Incorrect",
      HttpCode.NOT_FOUND
    );
  }

  const token = await jwtUtil.generateWebToken(targetUser);

  return token;
};

export default { signIn };
