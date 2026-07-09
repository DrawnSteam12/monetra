import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fullName, email, password } = request.body;

  if (!fullName || !email || !password) {
    return response.status(400).json({
      message: "All fields are required",
    });
  }

  if (password.length < 8) {
    return response.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  if (password.length > 128) {
    return response.status(400).json({
      message: "Password cannot exceed 128 characters",
    });
  }

  next();
};

export const validateLogin = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required",
    });
  }

  next();
};

export const validateTransaction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { title, amount, category, type, date } = request.body;

  if (!title || !amount || !category || !type || !date) {
    return response.status(400).json({
      message: "All required transaction fields must be provided",
    });
  }

  if (amount <= 0) {
    return response.status(400).json({
      message: "Amount must be greater than 0",
    });
  }
  if (type !== "income" && type !== "expense") {
    return response.status(400).json({
      message: "Invalid transaction type",
    });
  }

  next();
};
