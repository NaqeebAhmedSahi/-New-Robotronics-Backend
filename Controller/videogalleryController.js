const VideoGallery = require('../models/videogalleryModel');
const path = require('path'); // Required for handling file paths


const allVideoGallery = async (req, res) => {
  try {
    // Fetch all video gallery records from the database
    const videoGalleries = await VideoGallery.find();

    // Check if there are no records
    if (videoGalleries.length === 0) {
      return res.status(404).json({
        message: 'No video galleries found',
      });
    }

    // Send the response with the fetched video galleries
    return res.status(200).json({
      message: 'Video galleries fetched successfully',
      data: videoGalleries,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching video galleries',
      error: err.message,
    });
  }
};



const addVideoGallery = async (req, res) => {
  try {
    const { workshopName, description, timeFrom, timeTo } = req.body;
    const thumbnail = req.file ? req.file.path : null; // Get the path of the uploaded thumbnail image

    // Ensure thumbnail is present (required field)
    if (!thumbnail) {
      return res.status(400).json({
        message: 'Thumbnail image is required',
      });
    }

    // Ensure time is in the format 'HH:MM'
    const convertToDate = (timeString) => {
      const currentDate = new Date();
      const [hours, minutes] = timeString.split(':');
      currentDate.setHours(hours, minutes, 0, 0); // Set hours and minutes, leave seconds and milliseconds as 0
      return currentDate;
    };

    // Convert timeFrom and timeTo to valid Date objects
    const timeFromDate = convertToDate(timeFrom);
    const timeToDate = convertToDate(timeTo);

    // Create a new VideoGallery instance
    const newVideoGallery = new VideoGallery({
      thumbnail, // Path to uploaded thumbnail image
      workshopName,
      description,
      time: {
        from: timeFromDate, // Time converted to Date object
        to: timeToDate,     // Time converted to Date object
      },
    });

    // Save to the database
    await newVideoGallery.save();

    return res.status(201).json({
      message: 'Video gallery added successfully',
      data: newVideoGallery,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Error adding video gallery',
      error: err.message,
    });
  }
};


// Delete gallery by ID
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params; // Get the gallery ID from the URL parameter
    
    // Find and delete the gallery by ID
    const gallery = await VideoGallery.findByIdAndDelete(id);
    
    // Check if the gallery exists
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ message: "Server error. Failed to delete gallery." });
  }
};
module.exports = {allVideoGallery, addVideoGallery, deleteGallery  };
