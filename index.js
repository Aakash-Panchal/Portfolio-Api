const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const ProjecRoutes = require("./routes/ProjectRoutes");
const EmailRoutes = require("./routes/EmailRoute");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["https://www.aakashpanchal.com", "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/admin", authRoutes);
app.use("/api/projects", ProjecRoutes);
app.use("/api/sendemail", EmailRoutes);
app.use("/images", express.static("images"));

const database = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Connected to Database");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
