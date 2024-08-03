import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  publishProductReview,
} from "../controllers/productController";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.put("/publish-product-review", publishProductReview);
router.delete("/delete-product-by-id", deleteProductById);

export default router;
