import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from './routes/productRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import contactRoutes from "./routes/contactRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/contact", contactRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
