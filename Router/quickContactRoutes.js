// routes/quickContactRoutes.js
import express from 'express';
import { submitContactForm, getAllContacts } from '../Controller/quickContactController.js';

const router = express.Router();

// POST route to submit the contact form
router.post('/submitContactForm', submitContactForm);

router.get('/contacts', getAllContacts);

// Optionally, you can add more routes, like GET for listing the submitted contacts
// router.get('/', getAllContacts);

export default router;
