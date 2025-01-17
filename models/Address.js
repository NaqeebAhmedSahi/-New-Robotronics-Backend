import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  countryRegion: { type: String, required: true },
  companyName: { type: String, default: null },
  streetAddress: { type: String, required: true },
  aptSuiteUnit: { type: String, default: null },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  postalCode: { type: String, required: true },
  deliveryInstruction: { type: String, default: null },
  isDefaultShipping: { type: Boolean, default: false },
  isDefaultBilling: { type: Boolean, default: false },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
