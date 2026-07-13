import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  userId: mongoose.Types.ObjectId;

  theme: "light" | "dark" | "system";

  currency: "USD" | "EUR" | "PHP";

  language: "en" | "fil";

  timezone: string;

  emailNotifications: boolean;

  pushNotifications: boolean;

  monthlyBudget: number;

  warningThreshold: number;

  criticalThreshold: number;

  budgetAlerts: boolean;

  transactionReminders: boolean;

  weeklySummary: boolean;

  monthlyReport: boolean;

  createdAt: Date;

  updatedAt: Date;
}
const settingsSchema = new Schema<ISettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: true,
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
      required: true,
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "PHP"],
      default: "PHP",
      required: true,
    },

    language: {
      type: String,
      default: "en",
    },

    timezone: {
      type: String,
      default: "Asia/Manila",
    },

    emailNotifications: {
      type: Boolean,
      default: true,
    },

    pushNotifications: {
      type: Boolean,
      default: true,
    },

    monthlyBudget: {
      type: Number,
      default: 0,
    },

    warningThreshold: {
      type: Number,
      default: 70,
    },

    criticalThreshold: {
      type: Number,
      default: 90,
    },

    budgetAlerts: {
      type: Boolean,
      default: true,
    },

    transactionReminders: {
      type: Boolean,
      default: true,
    },

    weeklySummary: {
      type: Boolean,
      default: false,
    },

    monthlyReport: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Settings = mongoose.model<ISettings>("Settings", settingsSchema);

export default Settings;
