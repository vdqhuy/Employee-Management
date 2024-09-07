import axiosClient from "./axiosClient";
import axiosDefault from "./axiosDefault";

const dangKyLichLamApi = {
    dangKyLichLam(data) {
        const url = '/dang-ky-lich-lam';
        return axiosClient.post(url, data);
    },
    danhSachDangKyLichLam() {
        const url = '/dang-ky-lich-lam';
        return axiosClient.get(url);
    },
    approveLichLam(data) {
        const url = '/dang-ky-lich-lam/approve';
        return axiosClient.put(url, data);
    },
    rejectLichLam(data) {
        const url = '/dang-ky-lich-lam/reject';
        return axiosClient.put(url, data);
    },
    doneLichLam(data) {
        const url = '/dang-ky-lich-lam/done';
        return axiosClient.put(url, data);
    },
    deleteLichLam(data) {
        const url = '/dang-ky-lich-lam/delete';
        return axiosClient.put(url, data);
    }
}

export default dangKyLichLamApi;