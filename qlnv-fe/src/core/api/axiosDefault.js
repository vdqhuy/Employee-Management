import axios from 'axios';
import queryString from 'query-string';
// import * as https from 'https';
// import * as fs from 'fs';


// var agent = new https.Agent({ 
//   ca: fs.readFileSync('ca.pem') 
// });

const axiosDefault = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    // httpsAgent: agent,
    paramsSerializer: params => queryString.stringify(params),
});

axiosDefault.interceptors.request.use((config) => {
    return config;
    
});

axiosDefault.interceptors.response.use((response) => { 
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
  
export default axiosDefault;