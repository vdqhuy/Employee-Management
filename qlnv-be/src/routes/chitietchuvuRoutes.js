import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as ChiTietChucVuController from "../controller/chitietchucvu.controller.js";
const router = Router();
router.use(adminGuard);
router.post('/them-chi-tiet-chuc-vu', ChiTietChucVuController.themChiTietChucVuController);
router.delete('/xoa-chi-tiet-chuc-vu', ChiTietChucVuController.xoaChiTietChucVuController);
router.get('/danh-sach-chi-tiet-chuc-vu', ChiTietChucVuController.danhSachChiTietChucVuController);
router.put('/cap-nhat-chi-tiet-chuc-vu', ChiTietChucVuController.hieuChinhChiTietChucVuController);

export default router;
