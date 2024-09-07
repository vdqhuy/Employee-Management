import { ChucVu } from "../model";
import sequelize from "sequelize";

export async function ThemChucVu (themChucVuDto) {
    try {
        const chucvu = await ChucVu.create({
            TenChucVu: themChucVuDto.TenChucVu,
            PhuCap: themChucVuDto.PhuCap,
            GhiChu: themChucVuDto.GhiChu,
            IsFullTime: themChucVuDto.IsFullTime,
        });
        await chucvu.save();
        return;
    } catch (error) {
        console.log(error);
        console.error('------>', 'traceback ThemChucVu');
        throw new Error(error);
    }
}

export async function danhSachChucVu(page, limit) {
    try {
        const {rows, count} = await ChucVu.findAndCountAll({
            where: {
                IsDelete: false
            },
            limit: parseInt(limit),
            offset: parseInt(((page - 1) * limit))
        });

        return { rows, count };
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback danhSachChucVu');
        throw new Error(error);
    }
}

export async function xoaMotChucVu(MaCV) {
    try {
        const result = await ChucVu.findOne({
            where: {
                MaCV: MaCV,
                IsDelete: false
            }
        });
        result.IsDelete = true;
        await result.save();
        return Promise.resolve();
    } catch (error) {
        console.error('------>', 'traceback xoaMotChucVu');
        return Promise.reject(new Error(error));
    }
}

export async function deleteChucVu(MaCV) {
    try {
        const result = await ChucVu.findOne({
            where: {
                MaCV: MaCV,
                IsDelete: false
            }
        });
        if (result) {
            await result.update({
                IsDeleted: true
            })
        }
    } catch (error) {
        console.error('traceback deleteChucVu');
        throw new Error(error)
    }
}

export async function capNhatChucVu(capNhatChucVuDto) {
    try {
        const chucvu = await ChucVu.findByPk(capNhatChucVuDto.MaCV);
        await chucvu.update({
            TenChucVu: capNhatChucVuDto.TenChucVu,
            PhuCap: capNhatChucVuDto.PhuCap,
            GhiChu: capNhatChucVuDto.GhiChu,
            IsFullTime: capNhatChucVuDto.IsFullTime,
            UpdateAt: sequelize.fn('GETDATE')
        });
        return;
    } catch (error) {
        // console.log(error)
        console.error('------>', 'traceback capNhatChucVu');
        throw new Error(error);
    }
}

export async function layToanBoMaChucVu() {
    try {
        const result = await ChucVu.findAll({
            where: {
                IsDelete: false
            },
            attributes: ['MaCV']
        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback layToanBoMaChucVu');
        throw new Error(error);
    }
}

export async function layToanBoTenChucVu() {
    try {
        const result = await ChucVu.findAll({
            where: {
                IsDelete: false
            },
            attributes: ['MaCV', 'TenChucVu']
        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback layToanBoTenChucVu');
        throw new Error(error);
    }
}