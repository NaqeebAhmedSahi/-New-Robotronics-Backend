import express from 'express';
import { createAddress } from '../Controller/addressController.js';

const router = express.Router();

// POST route to create a new address
router.post('/addresses', createAddress);

export default router;
