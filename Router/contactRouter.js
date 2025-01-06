const express = require("express");
const router = express.Router();
const { createContact, getAllContact } = require("../Controller/contactController");

// Define the route for contact form submission
router.post("/contact", createContact);

router.get("/getAllContact", getAllContact);


module.exports = router;
