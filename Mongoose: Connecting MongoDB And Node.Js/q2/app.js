const express = require("express");
const app = express();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/", taskRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
