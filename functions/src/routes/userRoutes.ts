import { Router } from "express";
import { signup, getUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/signup", signup);
router.post("/get-user", getUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);

export default router;
