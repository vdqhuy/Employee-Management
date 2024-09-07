import { Resp } from "../common/response";
import { danhSanhRole } from "../dao/role.dao";

export async function danhSachRoleController (req, res, next) {
    try {
        const result = await danhSanhRole();
        return new Resp(res, 200, 'Xoa nhan vien thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachRoleController');
        return new ReE(res, 201, 'Co loi khi xoa nhan vien').result;
    }
}