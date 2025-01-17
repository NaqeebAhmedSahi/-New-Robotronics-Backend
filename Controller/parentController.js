import Parent from '../models/parentModel.js';

// Create a new parent with children
export const createParent = async (req, res) => {
  const {
    firstName, lastName, phone, email, streetAddress, aptSuiteUnit, city, state, postalCode,
    countryRegion, dateOfBirth, gender, occupation, companyName, emergencyContact,
    preferredContactMethod, specialInstructions, children
  } = req.body;

  try {
    const newParent = new Parent({
      firstName, lastName, phone, email, streetAddress, aptSuiteUnit, city, state, postalCode,
      countryRegion, dateOfBirth, gender, occupation, companyName, emergencyContact,
      preferredContactMethod, specialInstructions, children
    });

    const savedParent = await newParent.save();
    return res.status(201).json(savedParent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get a parent by ID
export const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ error: 'Parent not found' });
    return res.status(200).json(parent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
