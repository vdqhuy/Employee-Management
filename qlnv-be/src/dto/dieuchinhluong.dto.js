export class TaoDieuChinhLuongDto {
    constructor(SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi, MaNV) {
        this.SoQuyetDinh = SoQuyetDinh;
        this.NgayKyKet = NgayKyKet;
        this.NgayDieuChinhLuong = NgayDieuChinhLuong;
        this.SoLuongMoi = SoLuongMoi;
        this.MaNV = MaNV;
    }
}

export class HieuChinhDieuChinhLuongDto {
    constructor(MaDCL, SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi) {
        this.MaDCL = MaDCL;
        this.SoQuyetDinh = SoQuyetDinh;
        this.NgayKyKet = NgayKyKet;
        this.NgayDieuChinhLuong = NgayDieuChinhLuong;
        this.SoLuongMoi = SoLuongMoi;
    }
}