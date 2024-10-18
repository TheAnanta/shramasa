import { Router } from "express";
import { getCarousal } from "../controllers/careousalController";


const router = Router();

router.post("/get-carousal-items", getCarousal);

export default router;
