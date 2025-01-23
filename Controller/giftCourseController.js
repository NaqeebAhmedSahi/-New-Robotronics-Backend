// controllers/giftCourseController.js
import GiftCourse from '../models/GiftCourse.js';

// Create a new Gift Course
export const createGiftCourse = async (req, res) => {
  try {
    const { recipientName, recipientEmail, date, message } = req.body;

    // Create a new GiftCourse document with the provided data
    const newGiftCourse = new GiftCourse({
      recipientName,
      recipientEmail,
      date,
      message,
    });

    // Save the new gift course to the database
    await newGiftCourse.save();

    res.status(201).json({
      message: 'Gift Course created successfully!',
      giftCourse: newGiftCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Gift Course' });
  }
};

// Get all Gift Courses
export const getGiftCourses = async (req, res) => {
  try {
    // Fetch all gift courses from the database
    const giftCourses = await GiftCourse.find();
    res.status(200).json(giftCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Gift Courses' });
  }
};
