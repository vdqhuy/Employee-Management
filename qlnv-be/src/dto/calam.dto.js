export class ThemCaLamDto {
    constructor(TenCa, MoTa, ThoiGianBatDau, ThoiGianKetThuc, IsDisable, CreatedBy) {
        this.TenCa = TenCa;
        this.MoTa = MoTa;
        this.ThoiGianBatDau = ThoiGianBatDau;
        this.ThoiGianKetThuc = ThoiGianKetThuc;
        this.CreatedBy = CreatedBy;
        this.IsDisable = IsDisable;
    }
}

export class HieuChinhCaLamDto {
    constructor(MaCa, TenCa, MoTa, ThoiGianBatDau, ThoiGianKetThuc, IsDisable) {
        this.MaCa = MaCa;
        this.TenCa = TenCa;
        this.MoTa = MoTa;
        this.ThoiGianBatDau = ThoiGianBatDau;
        this.ThoiGianKetThuc = ThoiGianKetThuc;
        this.IsDisable = IsDisable;
    }
}