import { Router } from "express";
import { capNhatTaiKhoanController, DangNhap, DoiMatKhauController, encryptPassword, taoTaiKhoanController, validateRecaptchaController, checkVerifyCodeController } from "../controller/taikhoan.controller.js";
const router = Router();

router.post('/dang-nhap', DangNhap);
router.post('/encrypt-password', encryptPassword);
router.post('/tao-tai-khoan', taoTaiKhoanController);
router.put('/cap-nhat-tai-khoan', capNhatTaiKhoanController);
router.put('/doi-mat-khau', DoiMatKhauController);
router.post('/validate-recaptcha', validateRecaptchaController);
router.put('/check-verify-code', checkVerifyCodeController);
export default router;