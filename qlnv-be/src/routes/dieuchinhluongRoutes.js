import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as DieuChinhLuongController from "../controller/dieuchinhluong.controller.js";
const router = Router();

router.use(adminGuard);
router.post('/', DieuChinhLuongController.taoDieuChinhLuongController);
router.get('/', DieuChinhLuongController.danhSachDieuChinhLuongController);
router.put('/', DieuChinhLuongController.hieuChinhDieuChinhLuongController);
router.get('/danh-sach-ma-dcl', DieuChinhLuongController.danhSachDieuChinhLuongOnlyMaDCTController);
export default router;