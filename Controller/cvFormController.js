// // controllers/cvFormController.js
import cvFormModel from '../models/cvFormModel.js';

const createJobApplication = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, streetAddress, city, state, postalCode, education, workExperience, skills, coverLetter } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "CV file is required" });
        }

        const newJobApplication = new cvFormModel({
            firstName,
            lastName,
            email,
            phone,
            streetAddress,
            city,
            state,
            postalCode,
            education,
            workExperience,
            skills,
            cvFile: req.file.path,
            coverLetter,
        });

        await newJobApplication.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: newJobApplication,
        });
    } catch (error) {
        console.error("Error in createJobApplication function:", error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};





// Controller function to get all job applications
const getAllApplications = async (req, res) => {
    try {
      // Fetch all job applications from the database
      const applications = await cvFormModel.find();
  
      // Return the applications in the response
      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      console.error("Error fetching job applications:", error);
  
      // Handle errors and return appropriate response
      res.status(500).json({
        success: false,
        message: "Failed to fetch job applications. Please try again later.",
      });
    }
  };


export {getAllApplications, createJobApplication };
// for postman testing
// const cvFormModel = require('../models/cvFormModel');

// const createJobApplication = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, streetAddress, city, state, postalCode, education, workExperience, skills, coverLetter, cvFile } = req.body;

//         // Ensure the cvFile field is present in the JSON object (you can remove this in production)
//         if (!cvFile) {
//             return res.status(400).json({ success: false, message: "CV file path is required for testing" });
//         }

//         const newJobApplication = new cvFormModel({
//             firstName,
//             lastName,
//             email,
//             phone,
//             streetAddress,
//             city,
//             state,
//             postalCode,
//             education,
//             workExperience,
//             skills,
//             cvFile, // Expecting a string path for testing
//             coverLetter,
//         });

//         await newJobApplication.save();

//         res.status(201).json({
//             success: true,
//             message: "Application submitted successfully",
//             data: newJobApplication,
//         });
//     } catch (error) {
//         console.error("Error in createJobApplication function:", error);
//         res.status(500).json({ success: false, message: `Server error: ${error.message}` });
//     }
// };

// module.exports = { createJobApplication };