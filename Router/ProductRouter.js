import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // Import fileURLToPath from the url module
import { dirname } from "path"; // Import dirname from the path module
import { addProduct, getProducts, deleteProductsById, getProductById, updateProductById } from "../Controller/ProductController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = dirname(__filename); // Get the directory name from the file path

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to Add a Product
router.post("/addProduct", upload.any(), addProduct);

router.get("/getProducts", getProducts);

router.delete("/deleteProduct/:id", deleteProductsById);

router.get("/getProductById/:id", getProductById);

router.put("/updateProductById/:id", upload.any(), updateProductById);

export default router;
