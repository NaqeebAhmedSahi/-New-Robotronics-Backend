
import  Contact from '../models/contactModel.js'; // Adjust path if needed

const createContact = async (req, res) => {
  console.log("Request body:", req.body); // Check if body data is as expected

  const { name, phone, email, schoolName, address, message } = req.body;

  // Simple validation
  if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
      // Debug before saving
      console.log("Saving new contact...");

      const newContact = new Contact({
          name,
          phone,
          email,
          schoolName,
          address,
          message,
      });

      await newContact.save();

      res.status(201).json({
          success: true,
          message: "Message received!",
          data: newContact,
      });
  } catch (error) {
      console.error("Error in createContact function:", error); // Detailed error log
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

const getAllContact = async (req, res) => {
    try {
      // Fetch all contact entries from the database
      const contacts = await Contact.find();
  
      // Check if contacts exist
      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found" });
      }
  
      // Send the contacts as a response
      res.status(200).json({ data: contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      res.status(500).json({ message: "Server error, unable to fetch contacts" });
    }
  };
  

// At the end of the file
export { createContact , getAllContact};