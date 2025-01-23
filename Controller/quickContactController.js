// controllers/quickContactController.js
import QuickContact from '../models/QuickContact.js';

// Handle the form submission
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, course, phone, message } = req.body;

    // Create a new contact form entry
    const newContact = new QuickContact({
      name,
      email,
      course,
      phone,
      message
    });

    // Save to the database
    await newContact.save();

    res.status(201).json({ message: 'Your contact form has been submitted successfully!' });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await QuickContact.find();
      res.status(200).json(contacts); // Respond with all contacts
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Failed to retrieve contacts' });
    }
  };

// Optionally, you can add more methods, such as fetching submitted contacts or updating a contact.
