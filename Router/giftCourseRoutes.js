// routes/giftCourseRoutes.js
import express from 'express';
import { createGiftCourse, getGiftCourses } from '../Controller/giftCourseController.js';

const router = express.Router();

// Route for creating a new Gift Course
router.post('/create', createGiftCourse);

// Route for fetching all Gift Courses
router.get('/getGiftCourses', getGiftCourses);

export default router;