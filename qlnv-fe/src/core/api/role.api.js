import axiosClient from "./axiosClient";

const roleApi = {
    danhSachRole() {
        const url = '/role';
        return axiosClient.get(url);
    },
}

export default roleApi;