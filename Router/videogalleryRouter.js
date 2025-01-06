const express = require('express');
const multer = require('multer');
const path = require('path'); // Import the 'path' module
const { addVideoGallery, allVideoGallery, deleteGallery } = require('../controller/videogalleryController'); // Assuming your controller is in 'controllers/videoController.js'

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Set file name with timestamp
  }
});

// Initialize multer with storage and file filter
const upload = multer({ storage: storage });

// Route to add a new video gallery, using 'upload.single' to handle file uploads
router.post('/addVideoGallery', upload.single('thumbnail'), addVideoGallery);

router.get('/allVideoGallery',allVideoGallery);
router.delete('/deleteGallery/:id',deleteGallery);

// router.delete('/coursesById/:id', deleteCourse);




module.exports = router;
