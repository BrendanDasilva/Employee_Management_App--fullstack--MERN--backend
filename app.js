require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://comp3123-101447806-frontend-cb4568212bc5.herokuapp.com", // Deployed frontend URL
  "http://localhost:3001", // Local frontend for development
];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from whitelisted origins
    } else {
      console.log(`Blocked by CORS: ${origin}`);
      callback(new Error("CORS policy: This origin is not allowed."));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-requested-with",
    "Origin",
    "Accept",
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Fallback for legacy browsers
};

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
const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");

// Enable CORS Preflight Requests for Specific Routes
app.options("/api/v1/user/*", cors(corsOptions)); // Enable preflight for user routes
app.options("/api/v1/emp/*", cors(corsOptions)); // Enable preflight for employee routes

// Define Routes with CORS Enabled
app.use("/api/v1/user", cors(corsOptions), userRoutes);
app.use("/api/v1/emp", cors(corsOptions), employeeRoutes);

// Root Route
app.get("/", cors(corsOptions), (req, res) => {
  res.send("Backend is running. Use /api/v1/user or other API routes.");
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
