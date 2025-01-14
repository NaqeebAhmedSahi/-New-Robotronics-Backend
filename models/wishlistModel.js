import mongoose from "mongoose";

const videoGallerySchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true, // URL or path to the thumbnail image
    },
    workshopName: {
      type: String,
      required: true, // Name of the workshop
      trim: true,
    },
    description: {
      type: String,
      required: true, // Description of the video
    },
    time: {
      from: {
        type: Date,
        required: true, // Start time of the video/workshop
      },
      to: {
        type: Date,
        required: true, // End time of the video/workshop
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation time
    },
  },
  { timestamps: true }
);

// Export the model
const Wishlist  = mongoose.model("VideoGallery", videoGallerySchema);
export default Wishlist;