import mongoose  from "mongoose";

const contentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "video", "text", etc.
  name: { type: String, required: true },
  file: { type: String, required: false }, // Path or URL
});

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  contents: [contentSchema],
});

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  modules: [moduleSchema],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  reviews: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  studentsDownloaded: { type: Number, default: 0 },
  freeTrial: { type: Boolean, default: false },
  features: { type: [String], default: [] },
  whatYouLearn: { type: [String], default: [] },
  options: { type: [String], default: [] },
  thumbnail: { type: String, default: null }, // Path to thumbnail image
  banner: { type: String, default: null }, // Path to banner image
  video: { type: String, default: null }, // Path to video file
  sections: [sectionSchema],
});

export default mongoose.model("Course", courseSchema);
