import axiosClient from "./axiosClient";
import axiosDefault from "./axiosDefault";

const accountApi = {
    login(data) {
        const url = '/admin/dang-nhap';
        return axiosDefault.post(url, data);
    },
    taoTaiKhoan(data) {
        const url = '/admin/tao-tai-khoan';
        return axiosClient.post(url, data);
    },
    capNhatTaiKhoan(data) {
        const url = '/admin/cap-nhat-tai-khoan';
        return axiosClient.put(url, data);
    },
    doiMatKhau(data) {
        const url = '/admin/doi-mat-khau';
        return axiosDefault.put(url, data);
    },
    validateRecaptcha(data) {
        const url = '/admin/validate-recaptcha';
        return axiosDefault.post(url, data);
    },
    verificationCode(data) {
        const url = '/admin/check-verify-code';
        return axiosDefault.put(url, data);
    }
}

export default accountApi;