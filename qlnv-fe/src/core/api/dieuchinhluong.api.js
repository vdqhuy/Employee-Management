import axiosClient from "./axiosClient";
// import axiosDefault from "./axiosDefault";

const dieuChinhLuongApi = {
    taoDieuChinhLuong(data) {
        const url = '/dieu-chinh-luong';
        return axiosClient.post(url, data);
    },
    hieuChinhDieuChinhLuong(data) {
        const url = '/dieu-chinh-luong';
        return axiosClient.put(url, data);
    },
    danhSachDieuChinhLuong({page, limit}) {
        const url = '/dieu-chinh-luong';
        return axiosClient.get(url, {
            params : {
                'page': page,
                'limit': limit
            }
        });
    },
    danhSachMaDieuChinhLuong() {
        const url = '/dieu-chinh-luong/danh-sach-ma-dcl';
        return axiosClient.get(url);
    }
}

export default dieuChinhLuongApi;