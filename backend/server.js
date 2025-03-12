import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  
import { connectDB } from './config/db.js';

const app = express();

app.listen(process.env.PORT, async () => {
    await connectDB();  
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
//