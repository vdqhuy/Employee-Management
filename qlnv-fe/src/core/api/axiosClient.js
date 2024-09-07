import axios from 'axios';
import queryString from 'query-string';
import { logout } from '../../ultis/common.function';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
        return config;
    } else {
        return logout();
    }
    
});

axiosClient.interceptors.response.use((response) => {  
    return response.data;
}, (error) => {
    // Handle errors
    throw error;
});
  
export default axiosClient;