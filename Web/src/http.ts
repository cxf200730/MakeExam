import axios from 'axios';

// 请求拦截
axios.interceptors.request.use(config => {


    return config;
})


// 响应拦截
axios.interceptors.response.use(response => {


    return response;
}, error =>{
    // 错误提醒
    return Promise.reject(error);
})
export default axios;