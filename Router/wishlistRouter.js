import express from 'express';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../Controller/wishlistController.js';
import { protect } from '../middleware/protect.js'; // JWT protection

const router = express.Router();

// Wishlist routes
router.post('/wishlist', protect, addToWishlist);
router.get('/wishlist', protect, getWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

export default router;
