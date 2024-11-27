require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://comp3123-101447806-frontend-cb4568212bc5.herokuapp.com", // Deployed frontend URL
  "http://localhost:3001", // Local frontend for development
];

// Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-requested-with, Origin, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      return res.status(204).end(); // Respond OK to preflight requests
    }
    next(); // Proceed to the next middleware for other methods
  } else {
    console.log(`Blocked by CORS: ${origin}`);
    res.status(403).json({ message: "CORS policy: Origin not allowed." });
  }
});

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/v1/user or other API routes.");
});

const userRoutes = require("./routes/user");
app.use("/api/v1/user", userRoutes);

const employeeRoutes = require("./routes/employee");
app.use("/api/v1/emp", employeeRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
