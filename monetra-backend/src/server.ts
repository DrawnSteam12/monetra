import authRoutes from "./routes/authRoutes";

import userRoutes from "./routes/userRoutes";

import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db";

import transactionRoutes from "./routes/transactionRoutes";

import settingsRoutes from "./routes/settingsRoutes";

import dashboardRoutes from "./routes/dashboardRoutes";

import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://monetra-mu48-rho.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/", (request, response) => {
  response.json({
    message: "Monetra Backend Running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
