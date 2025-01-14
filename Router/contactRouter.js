import express  from "express";
const router = express.Router();
import { createContact, getAllContact } from "../Controller/contactController.js";

// Define the route for contact form submission
router.post("/contact", createContact);

router.get("/getAllContact", getAllContact);


export default router;
