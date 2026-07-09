import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

const generateToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },

    process.env.JWT_SECRET!,

    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as StringValue,
    },
  );
};

export default generateToken;
