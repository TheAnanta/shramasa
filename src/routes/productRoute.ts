import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  publishProductReview,
  updateProduct,
  updateProductStock,
} from "../controllers/productController";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.post("/update-product-by-id", updateProduct);
router.post("/update-product-stock-by-id", updateProductStock);
router.put("/publish-product-review", publishProductReview);
router.delete("/delete-product-by-id", deleteProductById);

export default router;
