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
    } = req.body;

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