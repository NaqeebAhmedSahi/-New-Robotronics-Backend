import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  productSold: {
    type: Number,
    default: 0,
  },
  productWatched: {
    type: Number,
    default: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  shippingDays: {
    type: Number,
    required: true,
  },
  detailsDescription: {
    type: String,
  },
  features: [String],
  images: [String], // Store image file paths or URLs
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
