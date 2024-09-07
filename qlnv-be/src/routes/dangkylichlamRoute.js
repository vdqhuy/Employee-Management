import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as DangKyLichLamController from "../controller/dangkylichlam.controller.js";
const router = Router();

router.use(adminGuard);
router.post('/', DangKyLichLamController.dangKyLichLamController);
router.get('/', DangKyLichLamController.layDanhSachDangKyLichLamController);
router.put('/approve', DangKyLichLamController.approveLichLamController);
router.put('/reject', DangKyLichLamController.rejectLichLamController);
router.put('/done', DangKyLichLamController.doneLichLamController);
router.put('/delete', DangKyLichLamController.deleteLichLamController);
export default router;