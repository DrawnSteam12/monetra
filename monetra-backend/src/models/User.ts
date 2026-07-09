import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;

  email: string;

  password: string;

  phone: string;

  location: string;

  monthlyIncome: number;

  savingsGoal: number;

  createdAt: Date;

  updatedAt: Date;
}
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      select: false,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    monthlyIncome: {
      type: Number,
      default: 0,
      min: [0, "Monthly income cannot be negative"],
    },

    savingsGoal: {
      type: Number,
      default: 0,
      min: [0, "Savings goal cannot be negative"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
