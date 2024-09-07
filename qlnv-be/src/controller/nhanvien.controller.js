import { getAllNhanVien, hieuChinhNhanVien, layThongTinNhanVien, layToanBoEmailCuaNhanVien, themMoiNhanVien, xoaMotNhanVien } from "../dao/nhanvien.dao.js";
import { ReE, Resp } from "../common/response.js";
import { HieuChinhNhanVienDto, ThemMoiNhanVienDto } from "../dto/nhanvien.dto.js";

export async function getAllNhanVienController (req, res, next) {
    try {
        const {page, limit} = req.query;
        const {rows, count} = await getAllNhanVien(page, limit);
        return new Resp(res, 200, 'Lay danh sach nhan vien thanh cong', {rows, count}).result;
    } catch (error) {
        console.error('------>', 'traceback getAllNhanVienController');
        return new ReE(res,201, 'Lay danh sach nhan vien that bai').result;
    }
}

export async function themMoiNhanVienController(req, res, next) {
    const {TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email} = req.body;
    try {
        const dto = new ThemMoiNhanVienDto(TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email);
        await themMoiNhanVien(dto);
        return new Resp(res, 200, 'Them moi nhan vien thanh cong').result;
    } catch (error) {
        console.error('------>', 'traceback themMoiNhanVienController');
        return new ReE(res, 201, 'Them moi nhan vien that bai').result;
    }
}

export async function hieuChinhNhanVienController(req, res, next) {
    const {MaNV, TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email} = req.body;
    try {
        const dto = new HieuChinhNhanVienDto(MaNV, TenNV, NgaySinh, DiaChi, GioiTinh, DienThoai, SoCCCD, Email);
        await hieuChinhNhanVien(dto);
        return new Resp(res, 200, 'Hieu chinh nhan vien thanh cong').result;
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback hieuChinhNhanVienController');
        return new ReE(res, 201, 'Hieu chinh nhan vien that bai').result;
    }
}

export async function layThongTinNhanVienController(req, res, next) {
    const {nhan_vien_id} = req.query;
    try {
        const data = await layThongTinNhanVien(nhan_vien_id);
        if (data) {
            return new Resp(res, 200, 'Lay thong tin nhan vien thanh cong', data).result;
        } else {
            return new ReE(res, 201, 'Khong ton tai nhan vien nay').result;
        }
    } catch (error) {
        console.error('------>', 'traceback layThongTinNhanVienController');
        return new ReE(res, 201, 'Lay thong tin nhan vien that bai').result;
    }
}

export async function layToanBoEmailCuaNhanVienController (req, res, next) {
    try {
        const data = await layToanBoEmailCuaNhanVien();
        if (data.length > 0) {
            return new Resp(res, 200, 'Lay danh sach ten dang nhap cua nhan vien thanh cong', data).result;
        } else {
            return new ReE(res, 201, 'Ket qua tra ve rong').result;
        }
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback layToanBoEmailCuaNhanVienController');
        return new ReE(res, 201, 'Lay danh sach ten dang nhap cua nhan vien that bai').result;
    }
}

export async function xoaMotNhanVienController (req, res, next) {
    try {
        const { Email } = req.body;
        const promise = Email.map((Email) => {
            return xoaMotNhanVien(Email);
        });

        return Promise.allSettled(promise).then((result) => {
            result.map((e) => {
                if (e.status === 'rejected') {
                    throw new Error('Co loi khi xoa nhan vien')
                }
            });
            return new Resp(res, 200, 'Xoa nhan vien thanh cong').result;
        }).catch((error) => {return new ReE(res, 201, 'Co loi khi xoa nhan vien').result;});
    } catch (error) {
        console.log(error)
        console.error('------>', 'traceback xoaMotNhanVienController');
        return new ReE(res, 201, 'Co loi khi xoa nhan vien').result;
    }
}

export async function thongTinNguoiDungController (req, res, next) {
    try {
        const MaNV = req.user.MaNV;
        const result = await layThongTinNhanVien(MaNV);
        return new Resp(res, 200, 'Xoa nhan vien thanh cong', result).result;
    } catch (error) {
        console.error('------>', 'traceback thongTinNguoiDungController');
        return new ReE(res, 201, 'Co loi khi xoa nhan vien').result;
    }

}