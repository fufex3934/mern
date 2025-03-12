import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating new Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ succes: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error deleting product: ", error.message);
    res.status(404).json({ success: false, message: "Product not Found" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error updating products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
  });
};

startServer();
