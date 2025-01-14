// routes/notificationRoutes.js
import express  from "express";
const router = express.Router();
import { protectC } from "../middleware/courseMiddleware.js";
import {
  getNotifications,
  markAsRead,
} from "../Controller/notification.js";

router.get("/" , protectC, getNotifications);

router.put("/:id/read",protectC, markAsRead);

export default router;
