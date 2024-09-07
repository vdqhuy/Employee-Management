import { Resp } from "../common/response";
import { danhSachCaLam, danhSachCaLamOnlyMaCa, danhSachCaLamOnlyTenCa, hieuChinhCaLam, themCaLam } from "../dao/calam.dao";
import { HieuChinhCaLamDto, ThemCaLamDto } from "../dto/calam.dto";

export async function themCaLamController (req, res, next) {
    const { TenCa, MoTa, ThoiGianBatDau, ThoiGianKetThuc, IsDisable } = req.body;
    const user = req.user;
    try {

        const dto = new ThemCaLamDto(TenCa, MoTa, convertDateToTime(ThoiGianBatDau), convertDateToTime(ThoiGianKetThuc), IsDisable, user.MaTaiKhoan);
        await themCaLam(dto);
        return new Resp(res, 200, 'Them ca lam thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback themCaLamController');
        throw new Error(error);
    }
}

export async function hieuChinhCaLamController (req, res, next) {
    const { MaCa, TenCa, MoTa, ThoiGianBatDau, ThoiGianKetThuc, IsDisable } = req.body;
    try {

        const dto = new HieuChinhCaLamDto(MaCa, TenCa, MoTa, convertDateToTime(ThoiGianBatDau), convertDateToTime(ThoiGianKetThuc), IsDisable);
        await hieuChinhCaLam(dto);
        return new Resp(res, 200, 'Them ca lam thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback themCaLamController');
        throw new Error(error);
    }
}

function convertDateToTime(date) {
    return new Date(date).toTimeString().split(' ')[0];
}


export async function danhSachCaLamController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const {count, rows} = await danhSachCaLam(page, limit);
        return new Resp(res, 200, 'Lay danh sach ca lam thanh cong', {count, rows}).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachCaLamController');
        throw new Error(error);
    }
}

export async function danhSachCaLamOnlyMaCaController (req, res, next) {
    try {
        const result = await danhSachCaLamOnlyMaCa();
        return new Resp(res, 200, 'Lay danh sach ca lam thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachCaLamOnlyMaCaController');
        throw new Error(error);
    }
}

export async function danhSachCaLamOnlyTenCaController (req, res, next) {
    try {
        const result = await danhSachCaLamOnlyTenCa();
        return new Resp(res, 200, 'Lay danh sach ca lam thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachCaLamOnlyTenCaController');
        throw new Error(error);
    }
}