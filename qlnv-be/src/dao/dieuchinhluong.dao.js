import sequelize, { Op } from "sequelize";
import { DieuChinhLuong, NhanVien } from "../model";

export async function taoDieuChinhLuong(dto) {
    try {
        await DieuChinhLuong.create({
            SoQuyetDinh: dto.SoQuyetDinh,
            NgayKyKet: dto.NgayKyKet,
            NgayDieuChinhLuong: dto.NgayDieuChinhLuong,
            SoLuongMoi: dto.SoLuongMoi,
            CreateAt: sequelize.fn('GETDATE'),
            MaNV: dto.MaNV
        });
    } catch (error) {
        console.log(error);
        console.error('------>', 'traceback taoDieuChinhLuong');
        throw new Error(error);
    }
}

export async function xoaDieuChinhLuong(MaDCL) {
    try {
        const result = await DieuChinhLuong.findOne({
            where: {
                MaDCL: MaDCL,
                IsDelete: false
            }
        });
        result.IsDelete = true;
        await result.save();
        return Promise.resolve();
    } catch (error) {
        console.error('------>', 'traceback xoaDieuChinhLuong');
        return Promise.reject(new Error(error));
    }
}

export async function danhSachDieuChinhLuong(page, limit) {
    try {
        const {rows, count} = await DieuChinhLuong.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(((page - 1) * limit)),
            include: [{
                model: NhanVien,
                as: 'nhanvien',
                attributes: ['MaNV', 'TenNV', 'Email']
            }]
        });
        return {rows, count};
    } catch (error) {
        console.error('------>', 'traceback danhSachDieuChinhLuong');
        throw new Error(error);
    }
}

export async function danhSachDieuChinhLuongOnLyMaDCT() {
    try {
        const result = await DieuChinhLuong.findAll({
            attributes: ['MaDCL']
        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback danhSachDieuChinhLuongOnLyMaDCT');
        throw new Error(error);
    }
}

export async function hieuChinhDieuChinhLuong(dto) {
    try {
        const dcl = await DieuChinhLuong.findOne({
            where: {
                MaDCL: dto.MaDCL
            }
        });
        await dcl.update({
            SoQuyetDinh: dto.SoQuyetDinh,
            NgayKyKet: dto.NgayKyKet,
            NgayDieuChinhLuong: dto.NgayDieuChinhLuong,
            SoLuongMoi: dto.SoLuongMoi,
        })
    } catch (error) {
        console.error('------>', 'traceback hieuChinhDieuChinhLuong');
        throw new Error(error);
    }
}

export async function layLuongMoiNhatCuaNhanVien (MaNV) {
    try {
        const luong = await DieuChinhLuong.findAll({
            limit: 1,
            where: {
                MaNV: MaNV
            },
            order: [ [ 'NgayDieuChinhLuong', 'DESC' ]]
        });
        return luong[0].SoLuongMoi;
    } catch (error) {
        console.error('------>', 'traceback layLuongCuaNhanVienTheoThang');
        throw new Error(error);
    }
}