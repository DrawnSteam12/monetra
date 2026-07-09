import { Request, Response } from "express";

import User from "../models/User";

export const getUserProfile = async (request: any, response: Response) => {
  try {
    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }
    return response.status(200).json({
      id: user._id,
      fullName: user.fullName,

      email: user.email,

      phone: user.phone,

      location: user.location,

      monthlyIncome: user.monthlyIncome,

      savingsGoal: user.savingsGoal,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserProfile = async (request: any, response: Response) => {
  try {
    const { fullName, email, phone, location, monthlyIncome, savingsGoal } =
      request.body;

    const user = await User.findById(request.userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    user.location = location;
    user.monthlyIncome = monthlyIncome;
    user.savingsGoal = savingsGoal;

    await user.save();

    return response.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: user._id,

        fullName: user.fullName,

        email: user.email,

        phone: user.phone,

        location: user.location,

        monthlyIncome: user.monthlyIncome,

        savingsGoal: user.savingsGoal,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};
