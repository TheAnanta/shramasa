import { Router } from "express";
import { addPaymentInfoFromRazorpay, getOrder, instantiateOrder, updatePaymentInfoFromRazorpay } from "../controllers/orderController";


const router = Router();

router.post("/instantiate-order", instantiateOrder);
router.get("/get-orders/:userId", getOrder);
router.post("/add-payment-info", addPaymentInfoFromRazorpay);
router.put("/update-payment-info", updatePaymentInfoFromRazorpay);

export default router;
