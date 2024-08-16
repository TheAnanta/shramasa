import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  publishProductReview,
  getProductById,
  updateProduct,
  updateProductStock,
} from "../controllers/productController";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id", getProductById);
router.post("/update-product-by-id", updateProduct);
router.put("/update-product-stock-by-id", updateProductStock);
router.post("/publish-product-review", publishProductReview);
router.delete("/delete-product-by-id", deleteProductById);

export default router;
