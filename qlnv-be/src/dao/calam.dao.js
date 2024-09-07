import sequelize from "sequelize";
import { CaLam } from "../model";
export async function themCaLam(dto) {
  try {
    const result = await CaLam.create({
      TenCa: dto.TenCa,
      MoTa: dto.MoTa,
      ThoiGianBatDau: dto.ThoiGianBatDau,
      ThoiGianKetThuc: dto.ThoiGianKetThuc,
      CreatedBy: dto.CreatedBy,
      CreatedAt: sequelize.fn('GETDATE'),
      IsDisable: dto.IsDisable,
    });
    return result;
  } catch (error) {
    console.log(error);
    console.error("------>", "traceback themCaLam");
    throw new Error(error);
  }
}

export async function hieuChinhCaLam(dto) {
  try {
    const calam = await CaLam.findOne({
      where: {
        MaCa: dto.MaCa
      }
    });
    const result = await calam.update({
      TenCa: dto.TenCa,
      MoTa: dto.MoTa,
      ThoiGianBatDau: dto.ThoiGianBatDau,
      ThoiGianKetThuc: dto.ThoiGianKetThuc,
      IsDisable: dto.IsDisable,
    });
    return result;
  } catch (error) {
    console.error("------>", "traceback themCaLam");
    throw new Error(error);
  }
}

export async function danhSachCaLam(page, limit) {
  try {
    const { count, rows } = await CaLam.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(((page - 1) * limit))
    });
    return { count, rows };
  } catch (error) {
    console.error("------>", "traceback danhSachCaLam");
    throw new Error(error);
  }
}

export async function danhSachCaLamOnlyTenCa() {
  try {
    const result = await CaLam.findAll({
      where: {
        IsDisable: false
      },
      attributes: ['MaCa', 'TenCa']
    });
    return result
  } catch (error) {
    console.error("------>", "traceback danhSachCaLamOnlyTenCa");
    throw new Error(error);
  }
}

export async function danhSachCaLamOnlyMaCa() {
  try {
    const result = await CaLam.findAll({
      attributes: ['MaCa']
    });
    return result;
  } catch (error) {
    console.error("------>", "traceback danhSachCaLamOnlyMaCa");
    throw new Error(error);
  }
}

export async function calculateWorkHours (MaCa) {
  try {
    const caLam = await CaLam.findOne({
      where: {
        MaCa: MaCa
      }
    });
    const gioBatDau = caLam.ThoiGianBatDau.split(':');
    const gioKetThuc = caLam.ThoiGianKetThuc.split(':');
    let hourse = parseInt(gioKetThuc[0]) - parseInt(gioBatDau[0])
    if (hourse < 0) {
      hourse = 24 + hourse;
    }
    return hourse;
  } catch (error) {
    console.error("------>", "traceback calculateWorkHours");
    throw new Error(error);
  }
}
