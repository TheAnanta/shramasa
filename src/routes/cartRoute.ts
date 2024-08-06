import { Router } from "express";
import { addProductToCart, fetchUserCart, modifyCart } from "../controllers/cartControllers";


const router = Router();

router.post("/add-product-to-cart", addProductToCart);
router.post("/modify-cart", modifyCart);
router.get("/get-user-cart", fetchUserCart);

export default router;
