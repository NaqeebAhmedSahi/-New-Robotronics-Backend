import express from "express";
import { addBlog, getAllBlogs,deleteBlog } from "../Controller/blogController.js";
import multer from "multer";
import fs from "fs";

// Create uploads directory if not exists
const uploadDir = "uploads/blogs";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure file storage using Multer to save in "uploads/blogs"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.post(
    "/addBlog",
    upload.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "thumbnailImage", maxCount: 1 },
        { name: "authorImage", maxCount: 1 },
    ]),
    addBlog
);

router.get("/getAllBlogs", getAllBlogs);
router.delete("/deleteBlog/:id", deleteBlog);

export default router;
