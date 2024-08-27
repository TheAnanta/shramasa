import { Router } from "express";
import { getAllUserOrders } from "../../controllers/admin/adminOrderController";

const router = Router();

router.get("/get-all-user-orders", getAllUserOrders);

export default router;
