import { Router } from "express";
import { getAllUserOrders } from "../../controllers/admin/adminOrderController";

const router = Router();

router.post("/get-all-user-orders", getAllUserOrders);

export default router;
