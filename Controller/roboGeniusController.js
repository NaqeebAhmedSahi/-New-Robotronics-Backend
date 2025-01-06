const RoboGenius = require('../models/roboGeniusModel'); // Adjust the path as necessary
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'uploads/images/');
    } else if (file.mimetype.startsWith('video')) {
      cb(null, 'uploads/videos/');
    } else {
      cb(new Error('Invalid file type'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500, // Limit file size to 500MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image') ||
      file.mimetype.startsWith('video')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'));
    }
  },
}).fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

// Controller function
const createRoboGenius = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: err.message });
      }

      const {
        title,
        description,
        monthlyPrice,
        annualPrice,
        category,
        whatYouLearnDescription,
        skills,
        targetAudience,
        features,
        requirements,
        averageRating,
      } = req.body;

      const videoFile = req.files.videoFile?.[0];
      const imageFile = req.files.image?.[0];

      const newRoboGenius = new RoboGenius({
        title,
        description,
        monthlyPrice,
        annualPrice,
        category,
        whatYouLearn: {
          description: whatYouLearnDescription,
          skills,
        },
        targetAudience,
        features,
        requirements,
        rating: averageRating,
        video: videoFile
          ? {
              filename: videoFile.filename,
              url: `/uploads/videos/${videoFile.filename}`,
            }
          : undefined,
        image: imageFile
          ? {
              filename: imageFile.filename,
              url: `/uploads/images/${imageFile.filename}`,
            }
          : undefined,
      });

      await newRoboGenius.save();
      res.status(201).json({ message: 'RoboGenius created successfully!', data: newRoboGenius });
    });
  } catch (error) {
    console.error('Error saving RoboGenius:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Controller function to fetch all RoboGenius entries
const getAllRoboGenius = async (req, res) => {
  try {
    const roboGeniusList = await RoboGenius.find();

    if (roboGeniusList.length === 0) {
      return res.status(404).json({ message: 'No RoboGenius entries found' });
    }

    res.status(200).json({ message: 'RoboGenius data retrieved successfully', data: roboGeniusList });
  } catch (error) {
    console.error('Error fetching RoboGenius data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createRoboGenius,
  getAllRoboGenius,
};
