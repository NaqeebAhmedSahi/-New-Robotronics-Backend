import Address from '../models/Address.js';

// Function to handle POST request to create a new address
export const createAddress = async (req, res) => {
  const { firstName, lastName, countryRegion, companyName, streetAddress, aptSuiteUnit, city, state, phone, postalCode, deliveryInstruction, isDefaultShipping, isDefaultBilling } = req.body;

  try {
    // Create a new Address instance
    const newAddress = new Address({
      firstName,
      lastName,
      countryRegion,
      companyName,
      streetAddress,
      aptSuiteUnit,
      city,
      state,
      phone,
      postalCode,
      deliveryInstruction,
      isDefaultShipping,
      isDefaultBilling
    });

    // Save the address to the database
    const savedAddress = await newAddress.save();
    return res.status(201).json(savedAddress);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



// Function to handle GET request to fetch all addresses
export const getAddresses = async (req, res) => {
  try {
    // Fetch all addresses from the database
    const addresses = await Address.find();

    // If no addresses found
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    // Return the list of addresses
    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};