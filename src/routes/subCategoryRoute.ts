import { Router } from "express";
import {
  addSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateCategory,
} from "../controllers/subCategoryController";

const router = Router();

router.post("/add-subcategory", addSubCategory);
router.get("/get-all-subcategories", getAllSubCategories);
router.put("/get-subcategories-by-category", getSubCategoriesByCategory);
router.delete("/update-category", updateCategory);

export default router;
