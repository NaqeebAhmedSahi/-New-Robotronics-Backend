import express  from "express";
const router = express.Router();
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  createUser,
  allUser,
  getUser,
  forgotPassword,
  
  resetPassword,
  logout,
  updatePatchUserProfile,
  // deleteUser,
} from "../Controller/authController.js";

import { verifyTokenAdmin, verifyToken} from "../middleware/verifyToken.js";
import {protect} from "../middleware/protect.js";

// Registration route (does not require token)
router.post("/register", register);
// Login route (does not require token)
router.post("/login", login);

// Logout route
router.post('/logout', protect, logout);

// Get user profile (requires authentication)
router.get("/me", getUserProfile);    //router.get("/me", protect, getUserProfile);

// update user profile
router.put("/me", updateUserProfile); //router.put("/me", protect, updateUserProfile);

router.patch("/patchMe", updatePatchUserProfile); 

// create new user
 router.post('/',createUser);

// get all users
 router.get('/getAll',allUser);

// get user by id
 router.get('/find/:id',getUser);    //  http://localhost:8080/find/66b612746f3c27988f47175d

// not tested !!

// forgot-password || /reset-password/:resetToken
 router.post('/forgot-password', forgotPassword);
 router.put('/reset-password/:resetToken', resetPassword);

//  router.delete('/:id',deleteUser);
//  router.put('/',updateUser);


// Example of a protected route that requires authentication and admin privileges
router.get("/admin-dashboard", verifyToken, verifyTokenAdmin, (req, res) => {
  res.status(200).json({ msg: "Welcome to the admin dashboard" });
});

export default router;
