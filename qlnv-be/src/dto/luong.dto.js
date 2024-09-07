export class ThemLuongDto {
    constructor(MaNV, LuongCB, KhoanTru, PhuCap) {
        this.MaNV = MaNV;
        this.LuongCB = LuongCB;
        this.KhoanTru = KhoanTru;
        this.PhuCap = PhuCap;
    }
}

export class HieuChinhLuongDto {
    constructor(MaLuong, PhuCap, KhoanTru) {
        this.MaLuong = MaLuong;
        this.KhoanTru = KhoanTru;
        this.PhuCap = PhuCap;
    }
}