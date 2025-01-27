import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    bannerImage: String,
    thumbnailImage: String,
    categories: [String],
    title: { type: String, required: true },
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    paragraphs: [String],
    date: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImage: String,
    tags: [String],
    keywords: [String],

}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
