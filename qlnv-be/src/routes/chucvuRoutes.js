import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as ChucVuController from "../controller/chucvu.controller.js";
const router = Router();

router.use(adminGuard);
router.get('/danh-sach-chuc-vu', ChucVuController.danhSachChucVuController);
router.get('/danh-sach-ma-chuc-vu', ChucVuController.layToanBoMaChucVuController);
router.get('/danh-sach-ten-chuc-vu', ChucVuController.layToanBoTenChucVuController);
router.post('/them-chuc-vu', ChucVuController.themChucVuController);
router.delete('/xoa-chuc-vu', ChucVuController.xoaMotChucVuController);
router.put('/cap-nhat-chuc-vu', ChucVuController.capNhatChucVuController);
export default router;