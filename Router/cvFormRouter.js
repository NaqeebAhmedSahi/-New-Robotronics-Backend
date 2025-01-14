// routes/cvFormRouter.js
import express  from "express";
import multer from "multer";
import path from  "path";
import { createJobApplication , getAllApplications} from '../Controller/cvFormController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.pdf' || ext === '.doc' || ext === '.docx') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOC files are allowed'));
        }
    },
});

router.post('/', upload.single('cvFile'), createJobApplication);

router.get('/getAllApplication', getAllApplications);


export default router;
