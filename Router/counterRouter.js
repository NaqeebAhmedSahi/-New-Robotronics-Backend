import express  from "express";
const router = express.Router();
import {
  getCounter,
} from "../Controller/counterController.js";

// Route to get all count of all the api
router.get("/getAllCounter", getCounter);

export default router;