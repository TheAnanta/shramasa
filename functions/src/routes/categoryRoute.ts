import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

router.post("/add-category", addCategory);
router.get("/get-all-categories", getAllCategories);
router.put("/update-category", updateCategory);
router.delete("/delete-category", deleteCategory);

export default router;
