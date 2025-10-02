import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  date: { type: Date, default: Date.now },
  comments: [commentSchema]
});

export default mongoose.model("Article", articleSchema);
