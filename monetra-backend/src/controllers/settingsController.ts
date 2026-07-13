import { Request, Response } from "express";

import Settings from "../models/Settings";

interface AuthRequest extends Request {
  userId?: string;
}

export const getSettings = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    const settings = await Settings.findOne({ userId });

    if (!settings) {
      const newSettings = await Settings.create({ userId });

      return response.status(200).json({
        settings: newSettings,
      });
    }

    return response.status(200).json({
      settings,
    });
  } catch (error) {
    console.error("Get Settings Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateSettings = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      theme,
      currency,
      language,
      timezone,
      emailNotifications,
      pushNotifications,
      monthlyBudget,
      warningThreshold,
      criticalThreshold,
      budgetAlerts,
      transactionReminders,
      weeklySummary,
      monthlyReport,
    } = request.body;

    let settings = await Settings.findOne({ userId });

    if (!settings) {
      settings = await Settings.create({
        userId,
      });
    }
    if (theme !== undefined) {
      settings.theme = theme;
    }

    if (currency !== undefined) {
      settings.currency = currency;
    }

    if (language !== undefined) {
      settings.language = language;
    }

    if (timezone !== undefined) {
      settings.timezone = timezone;
    }

    if (emailNotifications !== undefined) {
      settings.emailNotifications = emailNotifications;
    }

    if (pushNotifications !== undefined) {
      settings.pushNotifications = pushNotifications;
    }

    if (monthlyBudget !== undefined) {
      settings.monthlyBudget = monthlyBudget;
    }

    if (warningThreshold !== undefined) {
      settings.warningThreshold = warningThreshold;
    }

    if (criticalThreshold !== undefined) {
      settings.criticalThreshold = criticalThreshold;
    }

    if (budgetAlerts !== undefined) {
      settings.budgetAlerts = budgetAlerts;
    }

    if (transactionReminders !== undefined) {
      settings.transactionReminders = transactionReminders;
    }

    if (weeklySummary !== undefined) {
      settings.weeklySummary = weeklySummary;
    }

    if (monthlyReport !== undefined) {
      settings.monthlyReport = monthlyReport;
    }
    await settings.save();
    return response.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update Settings Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};
