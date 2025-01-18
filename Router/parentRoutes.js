import express from 'express';
import { createParent, getParentById, getAllParents } from '../Controller/parentController.js';

const router = express.Router();

// Route to create a new parent with children
router.post('/parents', createParent);

router.get('/parents', getAllParents); // Get all parents
router.get('/parents/:id', getParentById); // Get parent by ID

export default router;
