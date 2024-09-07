import { Op } from "sequelize";
import { Luong, NhanVien } from "../model";
import { LogModelObject } from "../ultils/logModelObject";
import { checkIsFullTime, checkPhuCapChucVuCuaNhanVien } from "./chitietchucvu.dao";
import { sumWorkDay, sumWorkHours } from "./dangkylichlam.dao";
import { layLuongMoiNhatCuaNhanVien } from "./dieuchinhluong.dao";
export async function themLuong(dto) {
    try {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const data = await Luong.findOne({
            where: {
                [Op.and]: {
                    CreatedAt: {
                        [Op.between]: [firstDay, lastDay],
                    },
                    MaNV: dto.MaNV,
                },
            },
        });
        if (data) {
            await data.update({
                MaNV: dto.MaNV,
                Luong: dto.LuongCB,
                PhuCap: dto.PhuCap,
                KhoanTru: dto.KhoanTru,
                UpdatedAt: new Date(),
            });
        } else {
            await Luong.create({
                MaNV: dto.MaNV,
                Luong: dto.LuongCB,
                PhuCap: dto.PhuCap,
                KhoanTru: dto.KhoanTru,
            });
        }
    } catch (error) {
        console.error("------>", "traceback themLuong");
        throw new Error(error);
    }
}

export async function hieuChinhLuong(dto) {
    try {
        console.log(dto)
        const findLuong = await Luong.findOne({
            where: {
                MaLuong: dto.MaLuong,
            },
        });
        if (findLuong) {
            findLuong.PhuCap = dto.PhuCap;
            findLuong.KhoanTru = dto.KhoanTru;
            await findLuong.save();
        } else {
            return null;
        }
    } catch (error) {
        console.error("------>", "traceback hieuChinhLuong");
        throw new Error(error);
    }
}

export async function danhSachLuong(page, limit) {
    try {
        const { rows, count } = await Luong.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt((page - 1) * limit),
            where: {
                IsDeleted: false
            },
            include: [
                {
                    model: NhanVien,
                    as: "nhanvien",
                },
            ],
        });

        return { rows, count };
    } catch (error) {
        console.error("------>", error,"traceback danhSachLuong");
        throw new Error(error);
    }
}

export async function calculateLuong(month, MaNV) {
    try {

        const isFullTimeNV = await checkIsFullTime(MaNV);
        if (isFullTimeNV) {
            const sumDay = await sumWorkDay(month, MaNV);
            const luongBasic = await layLuongMoiNhatCuaNhanVien(MaNV);
            const phuCapChucVu = await checkPhuCapChucVuCuaNhanVien(MaNV);
            const luongData = await getLuong(MaNV);
            const finalLuong = sumDay * luongBasic + phuCapChucVu;
            return {
                totalHours: null,
                totalDays: sumDay,
                baseSalary: luongBasic,
                salary: finalLuong,
                phuCapChucVu: phuCapChucVu,
                phuCapThem: luongData ? luongData.PhuCap : 0,
                KhoanTru: luongData ? luongData.KhoanTru : 0,
                IsFullTime: isFullTimeNV
            };
        } else {
            const sumHours = await sumWorkHours(month, MaNV);
            const luongBasic = await layLuongMoiNhatCuaNhanVien(MaNV);
            const phuCapChucVu = await checkPhuCapChucVuCuaNhanVien(MaNV);
            const luongData = await getLuong(MaNV);
            const finalLuong = sumHours * luongBasic + phuCapChucVu;
            return {
                totalHours: sumHours,
                totalDays: null,
                baseSalary: luongBasic,
                salary: finalLuong,
                phuCapChucVu: phuCapChucVu,
                phuCapThem: luongData ? luongData.PhuCap : 0,
                KhoanTru: luongData ? luongData.KhoanTru : 0,
                IsFullTime: isFullTimeNV
            };
        }
        
    } catch (error) {
        console.error("------>", "traceback calculateLuong");
        throw new Error(error);
    }
}

export async function deleteLuong(MaNV) {
    try {
        const luong = await Luong.findAll({
            where: {
                MaNV: MaNV
            }
        });
        if (luong && luong.length > 0) {
            const promise = luong.map((element) => {
                element.update({
                    IsDeleted: true
                })
            });
            return Promise.all(promise);
        };

    } catch (error) {
        console.error("------>", error, "traceback deleteLuong");
        throw new Error(error);
    }
}

export async function getLuong(MaNV) {
    try {
        const result = await Luong.findOne({
            limit: 1,
            where: {
                MaNV: MaNV
            },
            order: [ [ 'UpdatedAt', 'DESC' ]],
        });
        return result
    } catch (error) {
        console.error("------>", "traceback getLuong");
        throw new Error(error);
    }
}
