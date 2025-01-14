import mongoose from "mongoose";

const videoGallerySchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  workshopName: { type: String, required: true },
  description: { type: String, required: true },
  time: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
});

// Check if the model already exists, and use it if it does
const VideoGallery =
  mongoose.models.VideoGallery || mongoose.model("VideoGallery", videoGallerySchema);

export default VideoGallery;
