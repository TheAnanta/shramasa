import { Router } from "express";
import { getReview } from "../controllers/reviewController";


const router = Router();

router.post("/get-review", getReview);

export default router;
