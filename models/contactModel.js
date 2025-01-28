// models/Contact.js

import mongoose from "mongoose";

// Define the schema for the Contact
const contactSchema = new mongoose.Schema({
    ParentOrSchool: {
        type: String,
        enum: ["school", "parent"],
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    schoolName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    ServicesNeeded: {
        type: [String],
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Contact model using the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the model
export default Contact;
