import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: String,
});

export default mongoose.model("Tasks", taskSchema);
