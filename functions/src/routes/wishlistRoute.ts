import { Router } from "express";
import { getUserWishlist, modifyWishlist } from "../controllers/wishlistController";

const router = Router();

// router.post("/add-product-to-cart", addProductToCart);
router.post("/modify-wishlist", modifyWishlist);
router.get("/get-user-wishlist/:userId", getUserWishlist);

export default router;
