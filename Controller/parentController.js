import Parent from '../models/parentModel.js';

// POST: Create a new parent
export const createParent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      aptSuiteUnit = null,
      city,
      state,
      postalCode,
      countryRegion,
      dateOfBirth,
      gender = null,
      occupation = null,
      companyName = null,
      emergencyContact = {},
      preferredContactMethod = null,
      specialInstructions = null,
      children = [],
    } = req.body;

    // Validation: Check required fields
    if (!firstName || !lastName || !phone || !email || !streetAddress || !city || !state || !postalCode || !countryRegion || !dateOfBirth) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validation: Check children array
    if (!Array.isArray(children)) {
      return res.status(400).json({ message: 'Children should be an array' });
    }

    // Create a new Parent instance
    const newParent = new Parent({
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      aptSuiteUnit,
      city,
      state,
      postalCode,
      countryRegion,
      dateOfBirth,
      gender,
      occupation,
      companyName,
      emergencyContact,
      preferredContactMethod,
      specialInstructions,
      children,
    });

    // Save the new Parent document
    const savedParent = await newParent.save();
    res.status(201).json({ message: 'Parent created successfully', data: savedParent });
  } catch (error) {
    console.error('Error creating parent:', error);
    res.status(500).json({ message: 'Error creating parent', error: error.message });
  }
};


// GET: Retrieve all parents
export const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json({ message: 'Parents retrieved successfully', data: parents });
  } catch (error) {
    console.error('Error retrieving parents:', error);
    res.status(500).json({ message: 'Error retrieving parents', error: error.message });
  }
};

// GET: Retrieve a single parent by ID
export const getParentById = async (req, res) => {
  try {
    const { id } = req.params;
    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    res.status(200).json({ message: 'Parent retrieved successfully', data: parent });
  } catch (error) {
    console.error('Error retrieving parent:', error);
    res.status(500).json({ message: 'Error retrieving parent', error: error.message });
  }
};