import { Router } from "express";
import { getSimilarCatalogue } from "../controllers/productController";

const router = Router();

router.get("/get-similar-catalogue", getSimilarCatalogue);

export default router;
