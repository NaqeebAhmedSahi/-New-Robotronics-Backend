
import express  from "express";
import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGO_URL);
      console.log(`Successfully connected to mongoDb`);
    } catch (error) {
      console.log(error);
    }
  };
  export default connectToMongo;