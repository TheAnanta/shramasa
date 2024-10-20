import { Router } from "express";

import { getName } from "../controllers/nameController";

const router = Router();

router.get("/get-names", getName);

export default router;
