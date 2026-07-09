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

    const { theme, currency, language, timezone } = request.body;

    let settings = await Settings.findOne({ userId });

    if (!settings) {
      settings = await Settings.create({
        userId,
      });
    }
    settings.theme = theme;
    settings.currency = currency;
    settings.language = language;
    settings.timezone = timezone;

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
