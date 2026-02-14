import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  task: String,
});

export default mongoose.model("Tasks", taskSchema);
