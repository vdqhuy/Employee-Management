import { checkIfNhanVienAlreadyHaveChucVu, checkIfNhanVienAlreadyHaveChucVu2, danhSachChiTietChucVu, themChiTietChucVu, xoaChiTietChucVu, hieuChinhChiTietChucVu } from "../dao/chitietchucvu.dao.js";
import { ThemChiTietChucVuDto, HieuChinhChiTietChucVuDto } from "../dto/chitietchucvu.dto.js";
import { Resp, ReE } from "../common/response.js";

export async function themChiTietChucVuController (req, res, next) {
    try {
        const {MaCV, MaNV, NgayNhanChuc} = req.body;
        const checkIfNhanVienAlreadyThisChucVu = await checkIfNhanVienAlreadyHaveChucVu(MaNV, MaCV);
        if (checkIfNhanVienAlreadyThisChucVu && checkIfNhanVienAlreadyThisChucVu.length > 0) {
            return new ReE(res, 201, 'Nhan Vien hien tai da thuoc chuc vu nay').result;
        } else {
            const dto = new ThemChiTietChucVuDto(MaCV, MaNV, NgayNhanChuc);
            const result = await themChiTietChucVu(dto);
            return new Resp(res, 200, 'Them chi tiet chuc vu thanh cong').result;
        }
    } catch (error) {
        console.log(error);
        return new ReE(res, 201, 'Them chi tiet chuc vu that bai').result;
    }
}

export async function xoaChiTietChucVuController (req, res, next) {
    try {
        const { MaCTCV } = req.body;
        const promise = MaCTCV.map((MaCTCV) => {
            return xoaChiTietChucVu(MaCTCV);
        });

        return Promise.allSettled(promise).then((result) => {
            result.map((e) => {
                if (e.status === 'rejected') {
                    throw new Error('Co loi khi xoa chi tiet chuc vu')
                }
            });
            return new Resp(res, 200, 'Xoa chi tiet chuc vu thanh cong').result;
        }).catch((error) => {return new ReE(res, 201, 'Co loi khi xoa chi tiet chuc vu').result;});
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback xoaChiTietChucVunController');
        return new ReE(res, 201, 'Co loi khi xoa chi tiet chuc vu').result;
    }
}

export async function danhSachChiTietChucVuController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const {rows, count} = await danhSachChiTietChucVu(page, limit);
        return new Resp(res, 200, 'Lay danh sach chi tiet chuc vu thanh cong', {rows, count}).result;
    } catch (error) {
        return new ReE(res, 201, 'Lay danh sach chi tiet chuc vu that bai').result;
    }
}

export async function hieuChinhChiTietChucVuController (req, res, next) {
    try {
        const {MaCTCV, MaCV, MaNV, NgayNhanChuc} = req.body;
        const checkIfNhanVienAlreadyThisChucVu = await checkIfNhanVienAlreadyHaveChucVu2(MaNV, MaCV, NgayNhanChuc);
        if (checkIfNhanVienAlreadyThisChucVu && checkIfNhanVienAlreadyThisChucVu.length > 0) {
            return new ReE(res, 201, 'Nhan Vien hien tai da thuoc chuc vu nay').result;
        } else {
            const dto = new HieuChinhChiTietChucVuDto(MaCTCV, MaCV, MaNV, NgayNhanChuc);
            await hieuChinhChiTietChucVu(dto);
            return new Resp(res, 200, 'Lay danh sach chi tiet chuc vu thanh cong').result;
        }
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback hieuChinhChiTietChucVuController');
        return new ReE(res, 201, 'Lay danh sach chi tiet chuc vu that bai').result;
    }
}