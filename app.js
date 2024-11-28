require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://comp3123-101447806-frontend-cb4568212bc5.herokuapp.com", // Deployed frontend URL
  "http://localhost:3001", // Local frontend for development
];

// Simplified CORS Configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS globally

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

// Define Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/v1/user or other API routes.");
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
