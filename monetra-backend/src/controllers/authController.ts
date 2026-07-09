import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken";

import User from "../models/User";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { fullName, email, password } = request.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return response.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    response.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,

        fullName: user.fullName,

        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return response.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    response.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,

        fullName: user.fullName,

        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};
