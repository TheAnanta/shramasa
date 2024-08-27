import { Router } from "express";
import { getOrder,  instantiateOrder } from "../controllers/orderController";


const router = Router();

router.post("/instantiate-order", instantiateOrder);
router.get("/get-orders", getOrder);

export default router;
