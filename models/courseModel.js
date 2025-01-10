const mongoose = require('mongoose');

// Content Schema
const ContentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['video', 'audio', 'book', 'assignment'], required: true },
  name: { type: String, required: true },
  file: { type: String }, // File path or URL
});

// Module Schema
const ModuleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  contents: [ContentSchema], // Array of contents
});

// Section Schema
const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  modules: [ModuleSchema], // Array of modules
});

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sections: [SectionSchema], // Array of sections
});

module.exports = mongoose.model('Course', CourseSchema);
