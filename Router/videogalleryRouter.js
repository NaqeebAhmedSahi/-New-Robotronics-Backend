import express  from "express";
import multer from "multer";
import path from  "path";
import { addVideoGallery, allVideoGallery, deleteGallery } from '../Controller/videogalleryController.js'; 
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




export default router;
