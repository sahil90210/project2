const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("Library Management System API is Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});