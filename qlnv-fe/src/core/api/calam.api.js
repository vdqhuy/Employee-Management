import axiosClient from "./axiosClient";
// import axiosDefault from "./axiosDefault";

const caLamApi = {
    themCaLam(data) {
        const url = '/ca-lam';
        return axiosClient.post(url, data);
    },
    xoaCaLam(data) {
        const url = '/ca-lam';
        return axiosClient.delete(url, {
            data: data
        });
    },
    hieuChinhCaLam(data) {
        const url = '/ca-lam';
        return axiosClient.put(url, data);
    },
    danhSachCaLam({page, limit}) {
        const url = '/ca-lam';
        return axiosClient.get(url, {
            params : {
                'page': page,
                'limit': limit
            }
        });
    },
    danhSachMaCa() {
        const url = '/ca-lam/danh-sach-ma-ca';
        return axiosClient.get(url);
    },
    danhSachTenCaLam() {
        const url = '/ca-lam/danh-sach-ten-ca';
        return axiosClient.get(url);
    }
}

export default caLamApi;