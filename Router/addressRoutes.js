import express from 'express';
import { createAddress, getAddresses } from '../Controller/addressController.js';

const router = express.Router();

// POST route to create a new address
router.post('/addresses', createAddress);

// Route to fetch all addresses (GET)
router.get('/addresses', getAddresses);

export default router;