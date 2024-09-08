import axiosClient from "./axiosClient";
// import axiosDefault from "./axiosDefault";

const nhanvienApi = {
    danhSachNhanVien({page, limit}) {
        const url = '/nhan-vien/danh-sach-nhan-vien';
        return axiosClient.get(url, {
            params : {
                'page': page,
                'limit': limit
            }
        });
    },
    layThongTinNhanVien(nhan_vien_id) {
        const url = '/nhan-vien/thong-tin-nhan-vien';
        return axiosClient.get(url, {
            params: {
                'nhan_vien_id': nhan_vien_id
            }
        });
    },
    layThongTinEmailNhanVien() {
        const url = '/nhan-vien/danh-sach-ten-dang-nhap';
        return axiosClient.get(url);
    },
    themMoiNhanVien(data) {
        const url = '/nhan-vien/them-moi-nhan-vien';
        return axiosClient.post(url, data);
    },
    hieuChinhNhanVien(data) {
        const url = '/nhan-vien/hieu-chinh-nhan-vien';
        return axiosClient.put(url, data);
    },
    xoaNhanVien(data) {
        const url = '/nhan-vien/xoa-nhan-vien';
        return axiosClient.delete(url, {
            data: data
        });
    },
    layThongTinNguoiDung() {
        const url = '/nhan-vien/thong-tin-nguoi-dung';
        return axiosClient.get(url);
    },
}

export default nhanvienApi;