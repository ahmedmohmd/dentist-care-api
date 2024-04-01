import { NextFunction, Request, Response } from "express";
import prisma from "../../db/db";
import HttpCode from "../utils/http-status-code.util";
import jwtUtil from "../utils/jwt.util";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: "Access Denied: Missing or invalid authorization header",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await jwtUtil.verifyWebToken(token);

    if (!decodedToken || typeof decodedToken === "string") {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: "Access Denied: Invalid token provided" });
    }

    let targetUser = await prisma.user.findUnique({
      where: { email: decodedToken.email, id: decodedToken.id },
    });

    if (!targetUser) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: "Access Denied: User not found or not authenticated",
      });
    }

    Object.defineProperty(req, "user", {
      value: decodedToken,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default { authUser };
