import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoute";
import subCategoryRoutes from "./routes/subCategoryRoute";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import wishlistRoutes from "./routes/wishlistRoute";
import orderRoutes from "./routes/orderRoute";
import couponRoutes from "./routes/couponRoute";
import adminRoutes from "./routes/admin/adminRoute";
import addressRouter from "./routes/addressRoute";
import reviewRouter from "./routes/reviewRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/address", addressRouter);
app.use("/api/review", reviewRouter);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
 