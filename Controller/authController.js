import dotenv from 'dotenv';
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug line to check JWT_SECRET

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import crypto from 'crypto';

// Register a new user
const register = async (req, res) => {
  try {
    // Check if the user already exists
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(409).json({ msg: "User already registered" });
    }

    // Check if all fields are filled
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "All fields must be populated" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the user
    const user = await User.create({ ...req.body, password: hashedPassword });

    // Convert user to a plain object and remove the password
    const userObject = user.toObject();
    delete userObject.password;

    // Create JWT token
    const token = createToken(user);

    // Return the user data and token
    return res.status(201).json({ user: userObject, token });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error on register: ${error.message}` });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields must be populated " }); // 400 for bad request
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" }); // 401 for unauthorized
    }

    // Compare the provided password with the stored password
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(401).json({ msg: "Invalid credentials" }); // 401 for unauthorized
    }

    // Convert user to a plain object and remove password field
    const userObject = user.toObject();
    delete userObject.password;

    // Create JWT token
    const token = createToken(user);

    // Return the user data and token
    return res.status(200).json({ user: userObject, token });
  } catch (error) {
    return res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const user = await User.findById(req.user.id); // Assuming user is available through req.user.id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields conditionally if they are provided in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save(); // Save the updated user details

    res.status(200).json({ message: "User profile updated", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePatchUserProfile = async (req, res) => {
  const { id, name, email, phone, password } = req.body;

  console.log("User ID (Backend):", id); // Log user ID here

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's fields (only the ones provided in the request)
    if (name) user.username = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = password;

    // Save the updated user data
    const updatedUser = await user.save();

    return res.status(200).json({
      updatedUser, // Send back the updated user data
      message: "User info updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user info" });
  }
};

// Helper function to create JWT token
const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    isAdmin: user.isAdmin,
  };

  // Check if JWT_SECRET is correctly loaded
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export {
  register,
  login,
  updateUserProfile,
  updatePatchUserProfile,
  createToken,
};
