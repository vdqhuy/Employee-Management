import axiosClient from "./axiosClient";
import axiosDefault from "./axiosDefault";

const chucvuApi = {
    taoChucVu(data) {
        const url = '/chuc-vu/them-chuc-vu';
        return axiosClient.post(url, data);
    },
    xoaChucVu(data) {
        const url = '/chuc-vu/xoa-chuc-vu';
        return axiosClient.delete(url, {
            data: data
        });
    },
    danhSachChucVu({page, limit}) {
        const url = '/chuc-vu/danh-sach-chuc-vu';
        return axiosClient.get(url, {
            params : {
                'page': page,
                'limit': limit
            }
        });
    },
    danhSachMaChucVu() {
        const url = '/chuc-vu/danh-sach-ma-chuc-vu';
        return axiosClient.get(url);
    },
    danhSachTenChucVu() {
        const url = '/chuc-vu/danh-sach-ten-chuc-vu';
        return axiosClient.get(url);
    },
    hieuChinhChucVu(data) {
        const url = '/chuc-vu/cap-nhat-chuc-vu';
        return axiosClient.put(url, data);
    },
    themChiTietChucVu(data) {
        const url = '/chi-tiet-chuc-vu/them-chi-tiet-chuc-vu';
        return axiosClient.post(url, data);
    },
    xoaChiTietChucVu(data) {
        const url = '/chi-tiet-chuc-vu/xoa-chi-tiet-chuc-vu';
        return axiosClient.delete(url, {
            data: data
        });
    },
    danhSachChiTietChucVu(page, limit) {
        const url = '/chi-tiet-chuc-vu/danh-sach-chi-tiet-chuc-vu';
        return axiosClient.get(url, {
            params: {
                'page': page,
                'limit': limit
            }
        });
    },
    layThongTinChiTietChucVu(ctcv_id) {
        const url = '/chi-tiet-chuc-vu/thong-tin-chi-tiet-chuc-vu';
        return axiosClient.get(url, {
            params: {
                'ctcv_id': ctcv_id
            }
        });
    },
    hieuChinhChiTietChucVu(data) {
        const url = '/chi-tiet-chuc-vu/cap-nhat-chi-tiet-chuc-vu';
        return axiosClient.put(url, data);
    },
}

export default chucvuApi;