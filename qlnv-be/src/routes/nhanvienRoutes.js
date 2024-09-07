import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as NhanVienController from "../controller/nhanvien.controller.js";
const router = Router();

router.use(adminGuard);
router.get('/danh-sach-nhan-vien', NhanVienController.getAllNhanVienController);
router.get('/thong-tin-nhan-vien', NhanVienController.layThongTinNhanVienController);
router.get('/danh-sach-ten-dang-nhap', NhanVienController.layToanBoEmailCuaNhanVienController);
router.post('/them-moi-nhan-vien', NhanVienController.themMoiNhanVienController);
router.put('/hieu-chinh-nhan-vien', NhanVienController.hieuChinhNhanVienController);
router.delete('/xoa-nhan-vien', NhanVienController.xoaMotNhanVienController);
router.get('/thong-tin-nguoi-dung', NhanVienController.thongTinNguoiDungController);
export default router;