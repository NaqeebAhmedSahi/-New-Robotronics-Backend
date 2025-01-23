// models/GiftCourse.js
import mongoose from 'mongoose';

const giftCourseSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  message: {
    type: String,
    required: false,
  },
});

const GiftCourse = mongoose.model('GiftCourse', giftCourseSchema);

export default GiftCourse;
