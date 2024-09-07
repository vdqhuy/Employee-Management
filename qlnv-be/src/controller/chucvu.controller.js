import { HieuChinhChucVuDto, ThemChucVuDto } from "../dto/chucvu.dto.js";
import { Resp, ReE } from "../common/response.js";
import { capNhatChucVu, danhSachChucVu, layToanBoMaChucVu, layToanBoTenChucVu, ThemChucVu, xoaMotChucVu } from "../dao/chucvu.dao.js";
export async function themChucVuController (req, res, next) {
    try {
        const { TenChucVu, PhuCap, GhiChu, IsFullTime } = req.body;

        const themChucVuDto = new ThemChucVuDto(TenChucVu, PhuCap, GhiChu, IsFullTime );
        themChucVuDto.validate();
        if (themChucVuDto.errors.length > 0) {
            return new ReE(res, 201, 'Them chuc vu that bai', themChucVuDto.errors).result;
        } else {
            await ThemChucVu(themChucVuDto);
            return new Resp(res, 200, 'Them chuc vu thanh cong').result;
        }
    } catch (error) {
        console.error('------>', 'traceback themChucVuController');
        return new ReE(res, 201, 'Them chuc vu that bai').result;
    }
}

export async function xoaMotChucVuController (req, res, next) {
    try {
        const { MaCV } = req.body;
        const promise = MaCV.map((MaCV) => {
            return xoaMotChucVu(MaCV);
        });

        return Promise.allSettled(promise).then((result) => {
            result.map((e) => {
                if (e.status === 'rejected') {
                    throw new Error('Co loi khi xoa chuc vu')
                }
            });
            return new Resp(res, 200, 'Xoa chuc vu thanh cong').result;
        }).catch((error) => {return new ReE(res, 201, 'Co loi khi xoa chuc vu').result;});
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback xoaMotChucVunController');
        return new ReE(res, 201, 'Co loi khi xoa chuc vu').result;
    }
}

export async function capNhatChucVuController (req, res, next) {
    try {
        const {MaCV, TenChucVu, PhuCap, GhiChu} = req.body;
        const hieuChinhChucVuDto = new HieuChinhChucVuDto(MaCV, TenChucVu, PhuCap, GhiChu);
        hieuChinhChucVuDto.validate();
        if (hieuChinhChucVuDto.errors.length > 0) {
            return new ReE(res, 201, 'Cap nhat chuc vu that bai', hieuChinhChucVuDto.errors).result;
        } else {
            await capNhatChucVu(hieuChinhChucVuDto);
            return new Resp(res, 200, 'Cap nhat chuc vu thanh cong').result;
        }
    } catch (error) {
        console.error('------>', 'traceback capNhatChucVuController');
        return new ReE(res, 201, 'Cap nhat chuc vu that bai').result;
    }
}

export async function danhSachChucVuController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const { rows, count } = await danhSachChucVu(page, limit);
        return new Resp(res, 200, 'Lay danh sach chuc vu thanh cong', {rows, count}).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachChucVuController');
        return new ReE(res, 201, 'Them chuc vu that bai').result;
    }
}

export async function layToanBoMaChucVuController (req, res, next) {
    try {
        const result = await layToanBoMaChucVu();
        return new Resp(res, 200, 'Lay danh sach ma chuc vu thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback layToanBoMaChucVuController');
        return new ReE(res, 201, 'Lay danh sach ma chuc vu that bai').result;
    }
}

export async function layToanBoTenChucVuController (req, res, next) {
    try {
        const result = await layToanBoTenChucVu();
        return new Resp(res, 200, 'Lay danh sach ten chuc vu thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback layToanBoMaChucVuController');
        return new ReE(res, 201, 'Lay danh sach ten chuc vu that bai').result;
    }
}