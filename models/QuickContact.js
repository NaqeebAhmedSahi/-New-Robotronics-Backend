// models/QuickContact.js
import mongoose from 'mongoose';

// Define the schema for the contact form
const quickContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, match: /.+\@.+\..+/ },  // Valid email regex
  course: { type: String, required: true, enum: ['Course1', 'Course2', 'Course3'], default: 'Course1' }, // Dropdown options
  phone: { type: String, required: true },
  message: { type: String, default: '' }  // Optional message
}, { timestamps: true });  // Timestamps for createdAt and updatedAt

const QuickContact = mongoose.model('QuickContact', quickContactSchema);

export default QuickContact;
