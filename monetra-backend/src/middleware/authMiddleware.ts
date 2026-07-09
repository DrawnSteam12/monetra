import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  request: AuthRequest,

  response: Response,
  
  next: NextFunction,
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    request.userId = decoded.userId;

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
