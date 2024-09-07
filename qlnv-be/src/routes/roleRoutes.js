import { Router } from "express";
import { adminGuard } from "../controller/guard.controller.js";
import * as RoleController from "../controller/role.controller.js";
const router = Router();

// router.use(adminGuard);
router.get('/', RoleController.danhSachRoleController);
export default router;