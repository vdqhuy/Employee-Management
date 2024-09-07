import { ChiTietChucVu, NhanVien, ChucVu} from "../model";
import { LogModelObject } from "../ultils/logModelObject";
import { Op } from "sequelize";
import { deleteChucVu } from "./chucvu.dao";
import sequelize from "sequelize";

export async function themChiTietChucVu(dto) {
    try {
        await deleteAllPreviousChucVu(dto.MaNV);
        const result = await ChiTietChucVu.create({
            MaCV: dto.MaCV,
            MaNV: dto.MaNV,
            NgayNhanChuc: dto.NgayNhanChuc,
            CreateAt: new Date(),
            UpdateAt: new Date(),
            IsDelete: false
        });
        return result;
    } catch (error) {
        console.log('------>', 'traceback themChiTietChucVu')
    }
}

export async function xoaChiTietChucVu(MaCTCV) {
    try {
        const result = await ChiTietChucVu.findOne({
            where: {
                MaCTCV: MaCTCV,
                IsDelete: false
            }
        });
        await deleteChucVu(result.MaCV);
        result.IsDelete = true;
        await result.save();
        return Promise.resolve();
    } catch (error) {
        console.error(error);
        console.error('------>', 'traceback xoaChiTietChucVu');
        return Promise.reject(new Error(error));
    }
}

export async function checkIfNhanVienAlreadyHaveChucVu(MaNV, MaCV) {
    try {
        const result = await ChiTietChucVu.findAll({
            where: {
                [Op.and]: {
                    MaNV: MaNV,
                    MaCV: MaCV,
                    IsDelete: false
                }
            }
        });
        return result;
    } catch (error) {
        console.log('------>', 'traceback CheckIfNhanVienAlreadyHaveChucVu')
    }
}

export async function checkIfNhanVienAlreadyHaveChucVu2(MaNV, MaCV, NgayNhanChuc) {
    try {
        const result = await ChiTietChucVu.findAll({
            where: {
                [Op.and]: {
                    MaNV: MaNV,
                    MaCV: MaCV,
                    NgayNhanChuc: NgayNhanChuc,
                    IsDelete: false
                }
            }
        });
        return result;
    } catch (error) {
        console.log('------>', 'traceback CheckIfNhanVienAlreadyHaveChucVu')
    }
}

export async function deleteAllPreviousChucVu(MaNV) {
    try {
        const result = await ChiTietChucVu.findAll({
            where: {
                [Op.and]: {
                    MaNV: MaNV,
                    IsDelete: false
                }
            }
        });
        if (result && result.length > 0) {
            const promise = result.map((e) => {
                e.IsDelete = true;
                e.save();
            });

            return Promise.all(result).then(() => {})
        };
    } catch (error) {
        console.log('------>', 'traceback CheckIfNhanVienAlreadyHaveChucVu')
    }
 }

export async function danhSachChiTietChucVu(page, limit) {
    try {
        const {rows, count} = await ChiTietChucVu.findAndCountAll({
            where: {
                IsDelete: false,
            },
            attributes: ['MaCTCV', 'NgayNhanChuc'],
            include: [
                {
                    model: NhanVien,
                    as: 'nhanvien',
                    attributes: ['MaNV', 'TenNV']
                },
                {
                    model: ChucVu,
                    as: 'chucvu',
                    attributes: ['MaCV', 'TenChucVu']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(((page - 1) * limit))
        });
        return {rows, count};
    } catch (error) {
        console.error('------>', 'traceback danhSachChiTietChucVu');
        throw new Error(error);
    }
}

export async function checkPhuCapChucVuCuaNhanVien (MaNV) {
    try {
        const ctcv = await ChiTietChucVu.findAll({
            limit: 1,
            where: {
                MaNV: MaNV
            },
            order: [ [ 'NgayNhanChuc', 'DESC' ]],
            include: [{
                model: ChucVu,
                as: 'chucvu'
            }]
        });

        if (ctcv.length > 0) {
            return parseInt(ctcv[0].chucvu.PhuCap)
        } else {
            return 0;
        }
    } catch (error) {
        console.error('------>', 'traceback checkPhuCapChucVuCuaNhanVien');
        throw new Error(error);
    }
}

export async function deleteChiTietChucVu (MaNV) {
    try {
        const result = await ChiTietChucVu.findAll({
            where: {
                MaNV: MaNV,
                IsDelete: false
            }
        });
        if (result && result.length > 0) {
            const promise = result.map((element) => {
                element.IsDelete = true;
                element.save();
            })
            return Promise.all(promise)
        }
    } catch (error) {
        console.error('------>', 'traceback deleteChiTietChucVu');
        throw new Error(error);
    }
}

export async function deleteChiTietChucVuWithMaCV (MaCV) {
    try {
        const result = await ChiTietChucVu.findAll({
            where: {
                MaCV: MaCV,
                IsDelete: false
            }
        });
        if (result && result.length > 0) {
            const promise = result.map((element) => {
                element.IsDelete = true;
                element.save();
            })
            return Promise.all(promise)
        }
    } catch (error) {
        console.error('------>', 'traceback deleteChiTietChucVu');
        throw new Error(error);
    }
}

export async function checkIsFullTime (MaNV) {
    try {
        const ctcv = await ChiTietChucVu.findAll({
            limit: 1,
            where: {
                MaNV: MaNV
            },
            order: [ [ 'NgayNhanChuc', 'DESC' ]],
            include: [{
                model: ChucVu,
                as: 'chucvu'
            }]
        });
        if (ctcv.length > 0) {
            return ctcv[0].chucvu.IsFullTime;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback checkIsFullTime');
        throw new Error(error);
    }
}

export async function hieuChinhChiTietChucVu(dto) {
    try {
        console.log(dto)
        const findCTCV = await ChiTietChucVu.findOne({
            where: {
                MaCTCV: dto.MaCTCV,
                IsDelete: false
            },
        });
        await findCTCV.update({
            MaCV: dto.MaCV,
            MaNV: dto.MaNV,
            NgayNhanChuc: dto.NgayNhanChuc.toString(),
            UpdateAt: sequelize.fn('GETDATE'),
        })
    } catch (error) {
        console.error("------>", "traceback hieuChiTietChucVuDao");
        throw new Error(error);
    }
}