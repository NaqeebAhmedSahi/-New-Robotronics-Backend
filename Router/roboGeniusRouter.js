import express  from "express";
const router = express.Router();
import {
  createRoboGenius,
  getAllRoboGenius,
} from "../Controller/roboGeniusController.js";

router.post('/addRoboGenius', createRoboGenius);
router.get('/getallRoboGenius', getAllRoboGenius);



export default router;