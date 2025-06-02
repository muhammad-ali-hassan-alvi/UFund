import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Use upload.fields(...) when defining the route
router.post(
  "/create",
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "report", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]),
  createProduct
);

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "report", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]),
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
