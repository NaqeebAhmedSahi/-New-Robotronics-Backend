import express  from "express";
import { addToCart, getCart, removeFromCart } from '../controllers/CartController.js';
import { protect } from '../middleware/protect.js'; // JWT protection

const router = express.Router();

// Cart routes
router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.delete('/cart/:productId', protect, removeFromCart);

export default router;
