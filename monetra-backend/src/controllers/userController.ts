import { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import Transaction from "../models/Transaction";
import Settings from "../models/Settings";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const getUserProfile = async (
  request: AuthRequest,
  response: Response,
) => {
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

export const updateUserProfile = async (
  request: AuthRequest,
  response: Response,
) => {
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

export const changePassword = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const { currentPassword, newPassword } = request.body;

    const user = await User.findById(request.userId).select("+password");

    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    if (!currentPassword || !newPassword) {
      return response.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return response.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    

    if (!isPasswordCorrect) {
      return response.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return response.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change Password Error", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteAccount = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      return response.status(400).json({
        message: "User not found",
      });
    }

    await Transaction.deleteMany({
      user: request.userId,
    });

    await Settings.deleteOne({
      user: request.userId,
    });

    await User.findByIdAndDelete(request.userId);

    return response.status(200).json({});
  } catch (error) {
    console.error("Delete Account Error", error);

    return response.status(500).json({
      message: "Internal server errorr",
    });
  }
};
