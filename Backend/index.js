import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Tasks from "./model/Tasks.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"));

app.post("/Add", async (req, res) => {
  const { task } = req.body;
  try {
    await Tasks.create({ task });
  } catch (error) {
    res.status("404");
  }
});

app.get("/Fetch", async (req, res) => {
  const fetchedData = await Tasks.find({});
  res.send(fetchedData);
});

app.delete("/Delete/:id", async (req, res) => {
  await Tasks.findByIdAndDelete(req.params.id);
});

app.put("/Update/:id", async (req, res) => {
  const { task } = req.body;
  await Tasks.findByIdAndUpdate(req.params.id, { task });
});
app.listen(3000, () => console.log("Server is running..."));
