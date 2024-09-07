import { NhanVien, TaiKhoan, Role } from "../model";
import { addMoreZeroBeforNumber } from "../ultils/common.js";
import { encryptPassword } from "../ultils/encryptPassword.js";
import { LogModelObject } from "../ultils/logModelObject";
import { deleteChiTietChucVu } from "./chitietchucvu.dao";
import { deleteDangKyLichLam } from "./dangkylichlam.dao";
import { deleteLuong } from "./luong.dao";
import { deleteTaiKhoan } from "./taikhoan.dao";


export async function getAllNhanVien(page, limit) {
    try {
        const {rows, count} = await NhanVien.findAndCountAll({
            where: {
                IsDelete: false
            },
            limit: parseInt(limit),
            offset: parseInt(((page - 1) * limit)),
            include: [{
                model: TaiKhoan,
                as: 'admin'
            }]
        });
        return { rows, count };
    } catch (error) {
        console.error(error);
        console.error('------>', 'traceback getAllNhanVien');
        throw new Error(error);
    }
}

export async function themMoiNhanVien(themMoiNhanVienDto) {
    try {
        const {TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email} = themMoiNhanVienDto;
        const nhanvien = await NhanVien.create({
            TenNV: TenNV,
            NgaySinh: NgaySinh,
            DiaChi: DiaChi,
            GioiTinh: GioiTinh,
            DienThoai: DienThoai,
            SoCCCD: SoCCCD,
            Email: Email
        });
        await nhanvien.save();
        return;
    } catch (error) {
        console.error('------>', 'traceback themMoiNhanVien');
        console.log(error)
        throw new Error(error);
    }
}

export async function layThongTinNhanVien(MaNV) {
    try {
        const result = await NhanVien.findOne({
            where: {
                MaNV: MaNV
            },
            include: [{
                model: TaiKhoan,
                as: 'admin',
                include: [{
                    model: Role,
                    as: 'role'
                }]
            }]
        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback layThongTinNhanVien');
        throw new Error(error);
    }
}

export async function hieuChinhNhanVien(hieuChinhNhanVienDto) {
    try {
        const findNhanVien = await NhanVien.findOne({
            where: {
                MaNV: hieuChinhNhanVienDto.MaNV
            }
        });
        await findNhanVien.update({
            TenNV: hieuChinhNhanVienDto.TenNV,
            NgaySinh: hieuChinhNhanVienDto.NgaySinh,
            DiaChi: hieuChinhNhanVienDto.DiaChi,
            GioiTinh: hieuChinhNhanVienDto.GioiTinh,
            DienThoai: hieuChinhNhanVienDto.DienThoai,
            SoCCCD: hieuChinhNhanVienDto.SoCCCD,
            Email: hieuChinhNhanVienDto.Email
        });
    } catch (error) {
        console.error('------>', 'traceback hieuChinhNhanVien');
        throw new Error(error);
    }
}

export async function layToanBoEmailCuaNhanVien() {
    try {
        const result = await NhanVien.findAll({
            where: {
                IsDelete: false
            },
            attributes: ['MaNV', 'Email']
        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback layToanBoEmailCuaNhanVien');
        throw new Error(error);
    }
}

export async function xoaMotNhanVien(Email) {
    try {
        const result = await NhanVien.findOne({
            where: {
                Email: Email
            }
        });
        await deleteLuong(result.MaNV);
        await deleteTaiKhoan(result.MaNV);
        await deleteDangKyLichLam(result.MaNV);
        await deleteChiTietChucVu(result.MaNV);
        result.IsDelete = true;
        await result.save();
        return Promise.resolve();
    } catch (error) {
        console.error('------>', 'traceback xoaMotNhanVien');
        return Promise.reject(new Error(error));
    }
}

