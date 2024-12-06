import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  publishProductReview,
  getProductById,
  updateProduct,
  updateProductStock,
  getSimilarCatalogue,
} from "../controllers/productController";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id", getProductById);
router.post("/update-product-by-id", updateProduct);
router.post("/update-product-stock-by-id", updateProductStock);
router.post("/publish-product-review", publishProductReview);
router.delete("/delete-product-by-id", deleteProductById);
router.post("/get-similar-catalogue",  getSimilarCatalogue);

export default router;
