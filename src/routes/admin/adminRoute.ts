import { Router } from "express";
import {
  getAllCoupons,
  getAllUserOrders,
} from "../../controllers/admin/adminOrderController";
import {
  getAllBlogs,
  getBlog,
  postBlog,
} from "../../controllers/admin/adminBlogController";

const router = Router();

router.get("/get-all-user-orders", getAllUserOrders);
router.get("/get-all-coupons", getAllCoupons);
router.get("/get-blogs", getAllBlogs);
router.get("/get-blog-by-id", getBlog);
router.post("/post-blog", postBlog);

export default router;
