import { Router } from "express";
import { getAllCoupons, getAllUserOrders } from "../../controllers/admin/adminOrderController";

const router = Router();

router.get("/get-all-user-orders", getAllUserOrders);
router.get("/get-all-coupons", getAllCoupons);

export default router;
