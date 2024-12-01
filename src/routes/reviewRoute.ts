import { Router } from "express";
import { getReview, postReview } from "../controllers/reviewController";

const router = Router();

router.get("/get-review", getReview);
router.post("/post-review", postReview);

export default router;
