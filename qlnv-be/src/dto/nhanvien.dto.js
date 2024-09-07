export class HieuChinhNhanVienDto {
    constructor(MaNV, TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email) {
        this.MaNV = MaNV;
        this.TenNV = TenNV;
        this.NgaySinh = NgaySinh;
        this.DiaChi = DiaChi;
        this.GioiTinh = GioiTinh;
        this.DienThoai = DienThoai;
        this.SoCCCD = SoCCCD;
        this.Email = Email;
    }
}

export class ThemMoiNhanVienDto {
    constructor(TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email){
        this.TenNV = TenNV;
        this.NgaySinh = NgaySinh;
        this.DiaChi = DiaChi;
        this.GioiTinh = GioiTinh;
        this.DienThoai = DienThoai;
        this.SoCCCD = SoCCCD;
        this.Email = Email;
    }
}