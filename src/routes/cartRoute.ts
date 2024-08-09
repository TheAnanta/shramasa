import { Router } from "express";
import { addProductToCart, fetchUserCart, modifyCart, removeInvalidProductsFromCart } from "../controllers/cartControllers";


const router = Router();

router.post("/add-product-to-cart", addProductToCart);
router.post("/modify-cart", modifyCart);
router.get("/get-user-cart", fetchUserCart);
router.get("/remove-invalid-products", removeInvalidProductsFromCart);

export default router;
