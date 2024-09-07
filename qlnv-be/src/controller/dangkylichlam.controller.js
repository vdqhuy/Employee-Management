import { ReE, Resp } from "../common/response";
import { calculateWorkHours } from "../dao/calam.dao";
import { approveLichLam, checkIsDateHasSchedule, dangKyLichLam, deleteLichLam, doneLichLam, layDanhSachLichLamTheoNhanVien, rejectLichLam } from "../dao/dangkylichlam.dao";
import { DangKyLichLamDto } from "../dto/dangkylichlam.dto";

export async function dangKyLichLamController (req, res, next) {
    try {
        const {MaCa, NgayDangKy, GioLam, TrangThai} = req.body;
        const tongGioLam = await calculateWorkHours(MaCa);
        const dto = new DangKyLichLamDto(MaCa, NgayDangKy, tongGioLam, TrangThai, req.user.dataValues.MaNV);
        const checkIsExistSchedule = await checkIsDateHasSchedule(NgayDangKy, req.user.dataValues.MaNV);
        console.log(checkIsExistSchedule)
        if (checkIsExistSchedule) {
            return new ReE(res, 202, 'Dang ky lich lam that bai').result;
        } else {
            await dangKyLichLam(dto);
            return new Resp(res, 200, 'Dang ky lich lam thanh cong').result;
        }
        
    } catch (error) {
        console.error('------>', 'traceback dangKyLichLamController');
        return new ReE(res, 201, 'Dang ky lich lam that bai').result;
    }
}

export async function layDanhSachDangKyLichLamController (req, res, next) {
    try {
        const data = await layDanhSachLichLamTheoNhanVien();
        return new Resp(res, 200, 'Lay danh sach dang ky lich lam thanh cong', data).result;
    } catch (error) {
        console.error('------>', 'traceback layDanhSachDangKyLichLamController');
        return new ReE(res, 201, 'Lay danh sach dang ky lich lam that bai').result;
    }
}

export async function approveLichLamController(req, res, next) {
    try {
        const { MaLichLam } = req.body;
        await approveLichLam(MaLichLam);
        return new Resp(res, 200, 'Thao tac thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback approveLichLamController');
        return new ReE(res, 201, 'Thao tac that bai').result;
    }
}

export async function rejectLichLamController(req, res, next) {
    try {
        const { MaLichLam } = req.body;
        await rejectLichLam(MaLichLam);
        return new Resp(res, 200, 'Thao tac thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback rejectLichLamController');
        return new ReE(res, 201, 'Thao tac that bai').result;
    }
}

export async function doneLichLamController(req, res, next) {
    try {
        const { MaLichLam } = req.body;
        await doneLichLam(MaLichLam);
        return new Resp(res, 200, 'Thao tac thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback doneLichLamController');
        return new ReE(res, 201, 'Thao tac that bai').result;
    }
}

export async function deleteLichLamController(req, res, next) {
    try {
        const { MaLichLam } = req.body;
        await deleteLichLam(MaLichLam);
        return new Resp(res, 200, 'Thao tac thanh cong').result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback deleteLichLamController');
        return new ReE(res, 201, 'Thao tac that bai').result;
    }
}