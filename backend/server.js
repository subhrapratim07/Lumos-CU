require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use ENV variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connect
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Default route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});