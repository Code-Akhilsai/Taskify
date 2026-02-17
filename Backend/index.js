import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./model/User.js";
import Task from "./model/Tasks.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://taskify143.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

/* ================= AUTH MIDDLEWARE ================= */

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= SIGNUP ================= */

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup error" });
  }
});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

/* ================= ADD TASK ================= */

app.post("/Add", auth, async (req, res) => {
  try {
    const { task } = req.body;

    const newTask = await Task.create({
      userId: req.user.id,
      task,
    });

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Add task error" });
  }
});

/* ================= FETCH TASKS ================= */

app.get("/Fetch", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Fetch error" });
  }
});

/* ================= DELETE TASK ================= */

app.delete("/Delete/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
});

/* ================= UPDATE TASK ================= */

app.put("/Update/:id", auth, async (req, res) => {
  try {
    const { task } = req.body;

    await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { task }
    );

    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ message: "Update error" });
  }
});

app.listen(port, () => console.log("Server running on port 3000"));
