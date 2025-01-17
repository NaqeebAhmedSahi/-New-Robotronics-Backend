import express from 'express';
import { createParent, getParentById } from '../Controller/parentController.js';

const router = express.Router();

// Route to create a new parent with children
router.post('/parents', createParent);

// Route to get a parent by ID
router.get('/parents/:id', getParentById);

export default router;
