import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
