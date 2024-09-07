import { Op } from "sequelize";
import { DangKyLichLam, NhanVien, CaLam } from "../model";
import { LogModelObject } from "../ultils/logModelObject";
import { findAllTaiKhoanRoleEmployee } from "./taikhoan.dao";

export async function dangKyLichLam(dto) {
    try {
        const result = await DangKyLichLam.create({
            NgayDangKy: dto.NgayDangKy,
            GioLam: dto.TongGioLam,
            TrangThai: dto.TrangThai,
            MaNV: dto.MaNV,
            MaCa: dto.MaCa,
        });
        return result;
    } catch (error) {
        console.error("------>", "traceback dangKyLichLam");
        throw new Error(error);
    }
}

export async function checkIsDateHasSchedule(date, MaNV) {
    try {
        const currentDate = new Date(date);
        const firstHours = new Date(currentDate.setHours(0, 0, 0, 0));
        const lastHours = new Date(currentDate.setHours(23, 59, 59, 999));
        const findScheduleCurrentDate = await DangKyLichLam.findAll({
            where: {
                NgayDangKy: {
                    [Op.between]: [firstHours, lastHours]
                },
                IsDelete: false,
                MaNV: MaNV
            }
        });
        LogModelObject(findScheduleCurrentDate)
        if (findScheduleCurrentDate && findScheduleCurrentDate.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("------>", "traceback checkIsDateHasSchedule");
        throw new Error(error);
    }
}

export async function approveLichLam(MaLichLam) {
    try {
        const lichlam = await DangKyLichLam.findOne({
            where: {
                MaLichLam: MaLichLam
            }
        });
        await lichlam.update({
            TrangThai: 'APPROVE',
            UpdateAt: new Date()
        });
    } catch (error) {
        console.error("------>", "traceback approveLichLam");
        throw new Error(error);
    }
}

export async function rejectLichLam(MaLichLam) {
    try {
        const lichlam = await DangKyLichLam.findOne({
            where: {
                MaLichLam: MaLichLam
            }
        });
        await lichlam.update({
            TrangThai: 'REJECT',
            UpdateAt: new Date()
        });
    } catch (error) {
        console.error("------>", "traceback rejectLichLam");
        throw new Error(error);
    }
}

export async function doneLichLam(MaLichLam) {
    try {
        const lichlam = await DangKyLichLam.findOne({
            where: {
                MaLichLam: MaLichLam
            }
        });
        await lichlam.update({
            TrangThai: 'DONE',
            UpdateAt: new Date()
        });
    } catch (error) {
        console.error("------>", "traceback rejectLichLam");
        throw new Error(error);
    }
}

export async function deleteLichLam(MaLichLam) {
    try {
        const lichlam = await DangKyLichLam.findOne({
            where: {
                MaLichLam: MaLichLam
            }
        });
        await lichlam.update({
            IsDelete: true,
            UpdateAt: new Date()
        });
    } catch (error) {
        console.error("------>", "traceback rejectLichLam");
        throw new Error(error);
    }
}

export async function layDanhSachLichLamTheoNhanVien() {
    try {
        const findEmployeeUserAccount = await findAllTaiKhoanRoleEmployee();
        const { count, rows } = await NhanVien.findAndCountAll({
            where: {
                IsDelete: false,
                MaNV: {
                    [Op.in]: findEmployeeUserAccount
                }
            },
            attributes: ["MaNV", "TenNV"],
            include: [
                {
                    model: DangKyLichLam,
                    as: "dangkylichlam",
                    where: {
                        IsDelete: false,
                    },
                    include: [
                        {
                            model: CaLam,
                            as: "calam",
                        },
                    ],
                },
            ],
            // order: [[ 'dangkylichlam', 'UpdateAt', 'DESC' ]],
        });
        console.log(rows);
        return { count, rows };
    } catch (error) {
        console.log(error);
        console.error("------>", "traceback dangKyLichLam");
        throw new Error(error);
    }
}

export async function sumWorkHours (month, MaNV) {
    try {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), month, 1);
        const lastDay = new Date(date.getFullYear(), month + 1, 0);
        const result = await DangKyLichLam.findAll({
            where: {
                TrangThai: 'DONE',
                MaNV: MaNV,
                NgayDangKy: {
                    [Op.between]: [firstDay, lastDay]
                }
            }
        });
        LogModelObject(result)
        let hours = 0;
        if (result && result.length > 0) {
            result.map((element) => {
                hours += element.GioLam;
            })
        }
        return hours;
    } catch (error) {
        console.error("------>", "traceback sumWorkHourse");
        throw new Error(error);
    }
}

export async function sumWorkDay (month, MaNV) {
    try {
        const date = new Date();
        console.log(MaNV)
        const firstDay = new Date(date.getFullYear(), month, 1);
        const lastDay = new Date(date.getFullYear(), month + 1, 0);
        const result = await DangKyLichLam.findAll({
            where: {
                MaNV: MaNV,
                TrangThai: 'DONE',
                NgayDangKy: {
                    [Op.between]: [firstDay, lastDay]
                }
            }
        });
        if (result && result.length > 0) {
            return result.length;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("------>", "traceback sumWorkHourse");
        throw new Error(error);
    }
}

export async function deleteDangKyLichLam (MaNV) {
    try {
        const result = await DangKyLichLam.findAll({
            where: {
                MaNV: MaNV
            }
        });
        if (result && result.length > 0) {
            const promise = result.map((element) => {
                element.IsDelete = true;
                element.save()
            });
            return Promise.all(promise)
        }
    } catch (error) {
        console.error("------>", "traceback deleteDangKyLichLam");
        throw new Error(error);
    }
}