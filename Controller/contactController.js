
import  Contact from '../models/contactModel.js'; // Adjust path if needed


const createContact = async (req, res) => {
  try {
      const {
          ParentOrSchool,
          name,
          phone,
          email,
          schoolName,
          address,
          ServicesNeeded,
          message,
      } = req.body;

      // Validate required fields
      if (!ParentOrSchool || !name || !phone || !email || !ServicesNeeded || !message) {
          return res.status(400).json({ message: "All required fields must be filled." });
      }

      // Create a new contact document
      const newContact = new Contact({
          ParentOrSchool,
          name,
          phone,
          email,
          schoolName: schoolName || "", // Optional field
          address: address || "",       // Optional field
          ServicesNeeded: JSON.parse(ServicesNeeded), // Parse if sent as a JSON string
          message,
      });

      // Save the contact in the database
      await newContact.save();

      res.status(201).json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
      res.status(500).json({ message: "Error creating contact", error: error.message });
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