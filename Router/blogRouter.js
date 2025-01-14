import express from  'express';
const router = express.Router();
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from '../Controller/blogController.js';

// API routes
router.get('/blog', getAllPosts);
router.post('/', createPost);
// router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;