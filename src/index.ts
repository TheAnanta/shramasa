import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoute";
import subCategoryRoutes from "./routes/subCategoryRoute";
import productRoutes from "./routes/productRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api//users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
