import protectRoute from "../middleware/auth";
import { Router } from "express";
import { certificate, getCertificate, getCertificateById, delCertificateById } from "../controllers/certificate.controller";
import { RoleEnum } from "../common";

const router = Router();

router.post("/create", protectRoute(RoleEnum), certificate);
router.get("/userId", protectRoute(), getCertificate);
router.get("/userId/:id", protectRoute(), getCertificateById);
router.delete("/userId/:id", protectRoute(), delCertificateById);

export default router;