import { Router } from "express";
import {
  addSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
} from "../controllers/subCategoryController";

const router = Router();

router.post("/add-subcategory", addSubCategory);
router.get("/get-all-subcategories", getAllSubCategories);
router.get("/get-subcategories-by-category", getSubCategoriesByCategory);
router.delete("/update-subcategory", updateSubCategory);

export default router;
