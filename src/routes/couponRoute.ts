import { Router } from "express";
import { validateCoupon } from "../controllers/couponController";


const router = Router();

router.post("/validate-coupon", validateCoupon);
// router.post("/confirm-purchase", modifyCart);
// router.get("/revert-order", fetchUserCart);

export default router;
