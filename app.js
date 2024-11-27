require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  "https://comp3123-101447806-frontend-cb4568212bc5.herokuapp.com", // Deployed frontend URL
  "http://localhost:3001", // Local frontend for development
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); // Debugging CORS issues
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Required headers
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

// Preflight Request Handling
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

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

// React Frontend (if needed in the future)
// Uncomment these lines if you want the backend to serve the React frontend
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
