export class ThemChucVuDto {
    constructor(TenChucVu, PhuCap, GhiChu, IsFullTime ) {
        this.TenChucVu = TenChucVu;
        this.PhuCap = PhuCap;
        this.GhiChu = GhiChu;
        this.errors = [];
        this.IsFullTime = IsFullTime
    }

    validate () {
        if (!this.TenChucVu) {
            this.errors.push('Tên chức vụ không được để trống')
        }
    }
}

export class HieuChinhChucVuDto {
    constructor(MaCV, TenChucVu, PhuCap, GhiChu, IsFullTime) {
        this.MaCV = MaCV;
        this.TenChucVu = TenChucVu;
        this.PhuCap = PhuCap;
        this.GhiChu = GhiChu;
        this.errors = [];
        this.IsFullTime = IsFullTime;
    }

    validate () {
        if (!this.MaCV) {
            this.errors.push('MaCV không được để trống')
        }
        if (!this.TenChucVu) {
            this.errors.push('Tên chức vụ không được để trống')
        }
    }
}