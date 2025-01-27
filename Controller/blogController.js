import Blog from "../models/blogModel.js";
import path from "path";

// Create a new blog
export const addBlog = async (req, res) => {
    try {
        const { categories, title, views, shares, paragraphs, date, authorName, tags , keywords} = req.body;

        // Base URL for file access
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/blogs/`;

        // Handling file uploads with full paths
        const bannerImage = req.files["bannerImage"] 
            ? baseUrl + req.files["bannerImage"][0].filename 
            : "";
            
        const thumbnailImage = req.files["thumbnailImage"] 
            ? baseUrl + req.files["thumbnailImage"][0].filename 
            : "";
            
        const authorImage = req.files["authorImage"] 
            ? baseUrl + req.files["authorImage"][0].filename 
            : "";

        const newBlog = new Blog({
            bannerImage,
            thumbnailImage,
            categories: JSON.parse(categories),
            title,
            views: parseInt(views),
            shares: parseInt(shares),
            paragraphs: JSON.parse(paragraphs),
            date,
            authorName,
            authorImage,
            tags: JSON.parse(tags),
            keywords: JSON.parse(keywords),

        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByIdAndDelete(id);
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Server error while deleting blog" });
    }
  };
