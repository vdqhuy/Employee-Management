import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as LuongController from "../controller/luong.controller.js";
const router = Router();

router.use(adminGuard);
router.get('/tinh-luong', LuongController.calculateLuongControler);
router.post('/', LuongController.themLuongController);
router.get('/', LuongController.danhSachLuongController);
router.put('/', LuongController.hieuChinhLuongController);
export default router;