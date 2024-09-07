import axiosClient from "./axiosClient";
import axiosDefault from "./axiosDefault";

const luongApi = {
    tinhLuong() {
        const url = '/luong/tinh-luong';
        return axiosClient.get(url);
    },
    themLuong(data) {
        const url = '/luong';
        return axiosClient.post(url, data);
    },
    danhSachLuong({page, limit}) {
        const url = '/luong';
        return axiosClient.get(url, {
            params : {
                'page': page,
                'limit': limit
            }
        });
    },
    hieuChinhLuong(data) {
        const url = '/luong';
        return axiosClient.put(url, data);
    }
}

export default luongApi;