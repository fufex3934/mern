import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
  });
};

startServer();
