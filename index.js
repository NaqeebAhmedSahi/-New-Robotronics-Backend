import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectToMongo from './connection/connection.js';

// Importing Routers
import userRouter from './Router/User.js';
import courseRoutes from './Router/courseRouter.js';
import adminRoutes from './Router/adminRouter.js';
import productRoutes from './Router/ProductRouter.js';
import notificationRoutes from './Router/notification.js';
import blogRoutes from './Router/blogRouter.js';
import contactRouter from './Router/contactRouter.js';
import Wishlist from './Router/wishlistRouter.js';
import cvFormRouter from './Router/cvFormRouter.js';
import counterRoutes from './Router/counterRouter.js';
import roboGeniusRouter from './Router/roboGeniusRouter.js';
import videogalleryRouter from './Router/videogalleryRouter.js';

// Get the current directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// calling middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(join(__dirname, "uploads")));

// Route to handle POST requests for contact
app.post("/contact", contactRouter);

app.use("/contact", contactRouter);

// blog routes
app.use('/', blogRoutes);

// Wishlist
app.use('/wishlists', Wishlist);

// notifications
app.use('/notifications', notificationRoutes);

// product routes
app.use('/', productRoutes);

// Admin routes
app.use('/', adminRoutes);

// Authentication & User Management
app.use('/', userRouter);

// Course Management
app.use('/', courseRoutes);

// Counter Management
app.use('/', counterRoutes);

// Robo Genius routes
app.use('/', roboGeniusRouter);

// Video Gallery routes
app.use('/', videogalleryRouter);

// Use the job application routes
app.use('/cvForm', cvFormRouter);

// Serve static files
app.use('/uploads', express.static('uploads'));

// for testing 
app.get('/test', (req, res) => {
  res.send('Welcome to the server');
});

// calling connection server which is listening on port 
connectToMongo();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port} || http://localhost:${port}`);
});
