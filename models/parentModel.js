import mongoose from 'mongoose';
const { Schema } = mongoose;

const childSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  houseAddress: { type: String },
  contact: { type: String },
  email: { type: String },
  houseAddress: { type: String },
  dateOfBirth: { type: Date, required: true }, // Replaced age with dateOfBirth
  // grade: { type: String, required: true },
  // gender: { type: String, required: true },
  schoolName: { type: String, required: true } // Added schoolName
}, { timestamps: true });

const parentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  aptSuiteUnit: { type: String, default: null },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  countryRegion: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, default: null },
  occupation: { type: String, default: null },
  companyName: { type: String, default: null },
  emergencyContact: {
    name: { type: String, default: null },
    phone: { type: String, default: null }
  },
  preferredContactMethod: { type: String, default: null },
  specialInstructions: { type: String, default: null },
  children: [childSchema] // Embedded children array
}, { timestamps: true });

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;
