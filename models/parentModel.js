import mongoose from 'mongoose';
const { Schema } = mongoose;

const childSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  gender: { type: String, required: true }
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
