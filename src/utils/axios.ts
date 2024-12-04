// http.js
import axios from 'axios';
 
let cancelTokenSource = null;
 
function setupAxiosInterceptors() {
  // 请求拦截器
  axios.interceptors.request.use(config => {
    // 在这里可以添加你的逻辑
    return config;
  }, error => {
    // 处理请求错误
    return Promise.reject(error);
  });
 
  // 响应拦截器
  axios.interceptors.response.use(response => {
    // 在这里可以添加你的逻辑
    return response;
  }, error => {
    // 处理响应错误
    return Promise.reject(error);
  });
 
  // 保存cancel token，以便之后可以取消所有请求
  cancelTokenSource = axios.CancelToken.source();
  axios.defaults.cancelToken = cancelTokenSource.token;
}
 
function unmountAxiosInterceptors() {
  // 取消所有未完成的请求
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Operation canceled by the user.');
  }
 
  // 清理axios拦截器
  axios.interceptors.request.eject(axios.interceptors.request.handlers[0]);
  axios.interceptors.response.eject(axios.interceptors.response.handlers[0]);
}
 
export { setupAxiosInterceptors, unmountAxiosInterceptors };

// 在组件或应用的setup函数中
import { setupAxiosInterceptors, unmountAxiosInterceptors } from './http.js';
 
setupAxiosInterceptors(); // 安装拦截器
 
// 当你需要卸载拦截器时，可以调用
unmountAxiosInterceptors();