import { Router } from "express";
import {
  createAddress,
  getAllAddressesOfUser,
  getAddressById,
  deleteAddressById,
  updateAddressById,
} from "../controllers/addressController";

const router = Router();

router.post("/create-address", createAddress);
router.get("/get-all-addresses-of-user/:userId", getAllAddressesOfUser);
router.get("/get-address-by-id/", getAddressById);
router.put("/update-address-by-id", updateAddressById);
router.delete("/delete-address-by-id", deleteAddressById);

export default router;
