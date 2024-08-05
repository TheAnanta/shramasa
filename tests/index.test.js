import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../src/controllers/categoryController";

// apiObject_Endpoont_Action
test("categoriesapi_getAllCategories_fetchesValidCategories", async () => {
  const categories = await getAllCategories();
  expect(categories).toBeDefined();
});

test("categoriesapi_addCategory_successfullyAddsCategoryToDatabase", async () => {
  const newCategory = { name: "Test Category",  };
});
