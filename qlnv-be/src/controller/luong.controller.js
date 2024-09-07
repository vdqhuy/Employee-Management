import { ReE, Resp } from "../common/response";
import { calculateLuong, danhSachLuong, hieuChinhLuong, themLuong } from "../dao/luong.dao";
import { HieuChinhLuongDto, ThemLuongDto } from "../dto/luong.dto";

export async function themLuongController (req, res, next) {
    try {
        const {MaNV, LuongCB, KhoanTru, PhuCap} = req.body;    
        const dto = new ThemLuongDto(MaNV, LuongCB, KhoanTru, PhuCap);
        await themLuong(dto);
        return new Resp(res, 200, 'Them luong thanh cong').result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback themLuongController');
        return new ReE(res, 201, 'Them luong that bai').result;
    }
}

export async function calculateLuongControler (req, res, next) {
    try {
        const user = req.user;
        const currentMonth = new Date().getMonth();
        const { totalHours, totalDays , baseSalary, salary, phuCapChucVu, phuCapThem, KhoanTru, IsFullTime } = await calculateLuong(currentMonth, user.MaNV);
        return new Resp(res, 200, 'Tinh luong thanh cong', {totalHours, totalDays, baseSalary, salary, MaNV: user.MaNV, phuCapChucVu, phuCapThem, KhoanTru, IsFullTime}).result;
    } catch (error) {
        console.error('------>', 'traceback calculateLuongControler');
        return new ReE(res, 201, 'Tinh luong that bai').result;
    }
}

export async function danhSachLuongController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const {rows, count} = await danhSachLuong(page, limit);
        return new Resp(res, 200, 'Lay danh sach luong thanh cong', {rows, count}).result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback danhSachLuongController');
        return new ReE(res, 201, 'Lay danh sach luong that bai').result;
    }
}

export async function hieuChinhLuongController (req, res, next) {
    try {
        const {MaLuong, PhuCap, KhoanTru} = req.body;
        const dto = new HieuChinhLuongDto(MaLuong, PhuCap, KhoanTru);
        await hieuChinhLuong(dto);
        return new Resp(res, 200, 'Lay danh sach luong thanh cong').result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback hieuChinhLuongController');
        return new ReE(res, 201, 'Lay danh sach luong that bai').result;
    }
}