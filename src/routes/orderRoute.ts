import { Router } from "express";
import { instantiateOrder } from "../controllers/orderController";


const router = Router();

router.post("/instantiate-order", instantiateOrder);
// router.get("/modify-order-status", );

export default router;
