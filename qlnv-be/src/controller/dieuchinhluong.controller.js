import { ReE, Resp } from "../common/response";
import { danhSachDieuChinhLuong, danhSachDieuChinhLuongOnLyMaDCT, hieuChinhDieuChinhLuong, taoDieuChinhLuong, xoaDieuChinhLuong } from "../dao/dieuchinhluong.dao";
import { HieuChinhDieuChinhLuongDto, TaoDieuChinhLuongDto } from "../dto/dieuchinhluong.dto";

export async function taoDieuChinhLuongController (req, res, next) {
    try {
        const {SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi, MaNV} = req.body;
        const dto = new TaoDieuChinhLuongDto(SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi, MaNV);
        await taoDieuChinhLuong(dto);
        return new Resp(res, 200, 'Tao dieu chinh luong thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback taoDieuChinhLuongController');
        return new ReE(res, 201, 'Tao dieu chinh luong that bai').result;
    }
}

export async function xoaDieuChinhLuongController (req, res, next) {
    try {
        const { MaDCL } = req.body;
        const promise = MaDCL.map((MaDCL) => {
            return xoaDieuChinhLuong(MaDCL);
        });

        return Promise.allSettled(promise).then((result) => {
            result.map((e) => {
                if (e.status === 'rejected') {
                    throw new Error('Co loi khi xoa dieu chinh luong')
                }
            });
            return new Resp(res, 200, 'Xoa dieu chinh luong thanh cong').result;
        }).catch((error) => {return new ReE(res, 201, 'Co loi khi xoa dieu chinh luon').result;});
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback xoaDieuChinhLuongController');
        return new ReE(res, 201, 'Co loi khi xoa dieu chinh luong').result;
    }
}

export async function danhSachDieuChinhLuongController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const {rows, count} = await danhSachDieuChinhLuong(page, limit);
        return new Resp(res, 200, 'Lay danh sach dieu chinh luong thanh cong',{rows, count}).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachDieuChinhLuongController');
        return new ReE(res, 201, 'Lay danh sach dieu chinh luong that bai').result;
    }
}

export async function danhSachDieuChinhLuongOnlyMaDCTController (req, res, next) {
    try {
        const result = await danhSachDieuChinhLuongOnLyMaDCT();
        return new Resp(res, 200, 'Lay danh sach dieu chinh luong thanh cong',result).result;
    } catch (error) {
        console.error('------>', 'traceback danhSachDieuChinhLuongController');
        return new ReE(res, 201, 'Lay danh sach dieu chinh luong that bai').result;
    }
}

export async function hieuChinhDieuChinhLuongController (req, res, next) {
    try {
        const {MaDCL, SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi} = req.body;
        const dto = new HieuChinhDieuChinhLuongDto(MaDCL, SoQuyetDinh, NgayKyKet, NgayDieuChinhLuong, SoLuongMoi);
        await hieuChinhDieuChinhLuong(dto);
        return new Resp(res, 200, 'Hieu chinh thanh cong').result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback hieuChinhDieuChinhLuongController');
        return new ReE(res, 201, 'Hieu chinh that bai').result;
    }
}