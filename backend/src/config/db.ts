import mongoose from 'mongoose';
require("dotenv").config()

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGODB_URI ||'mongodb://localhost:27017/mydatabase'; 
   
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
