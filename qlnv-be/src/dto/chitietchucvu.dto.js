export class ThemChiTietChucVuDto {
    constructor(MaCV, MaNV, NgayNhanChuc) {
        this.MaCV = MaCV;
        this.MaNV = MaNV;
        this.NgayNhanChuc = NgayNhanChuc;
    }
}

export class HieuChinhChiTietChucVuDto {
    constructor(MaCTCV, MaCV, MaNV, NgayNhanChuc) {
        this.MaCTCV = MaCTCV;
        this.MaCV = MaCV;
        this.MaNV = MaNV;
        this.NgayNhanChuc = NgayNhanChuc;
    }
}