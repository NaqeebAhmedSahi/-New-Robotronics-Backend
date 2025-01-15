import express  from "express";
import multer from "multer";
import path from  "path";
import fs from "fs";
import { addProduct, getProducts, deleteProductsById } from "../Controller/ProductController.js";

const router = express.Router();

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
router.post(
  "/addProduct",
  upload.any(), // Accepts files with any field name
  addProduct
);

router.get("/getProducts", getProducts);

router.delete("/deleteProduct/:id", deleteProductsById);




export default router;



// const express = require('express');
// const router = express.Router();
// const { protectC, isAdmin } = require('../middleware/courseMiddleware');
// const { multerMiddleware } = require('../middleware/multerMiddleware'); // Import Multer middleware
// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getProductsByCategory,
//   addReview,
//   getProductReviews,
//   updateReview,
//   deleteReview,
// } = require('../Controller/ProductController');

// // Public routes
// router.get('/getProducts', getProducts);
// router.get('/getProductById/:id', getProductById);
// router.get('/category/:category', getProductsByCategory);
// router.get('/:id/reviews', getProductReviews);
// // Add this new route
// // router.get('/:id/image', getProductImage);

// // Admin-only routes
// // router.post('/addProduct', protectC, isAdmin, multerMiddleware, addProduct); // Add multerMiddleware here
// // router.post('/addProduct', multerMiddleware, addProduct); // Add multerMiddleware here
// router.post('/addProduct', addProduct); // Add multerMiddleware here
// router.put('/updateProduct/:id',  updateProduct);
// // router.delete('/:id', protectC, isAdmin, deleteProduct);
// router.delete('/deleteProduct/:id', deleteProduct);

// // Review routes
// router.post('/:id/review', protectC, addReview);
// router.put('/:id/reviews/:reviewId', protectC, isAdmin, updateReview);
// // router.delete('/:id/reviews/:reviewId', protectC, isAdmin, deleteReview);

// module.exports = router;