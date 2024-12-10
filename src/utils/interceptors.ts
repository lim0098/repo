import axios from 'axios'
import { userStore } from "@/store/user";//保存在本地的数据
import { ElMessageBox } from 'element-plus';
import router from '@/router';

const service = axios.create({
  // baseURL:'http://127.0.0.3:8080',
  baseURL: import.meta.env.VITE_AP_BASE_URL,
  timeout: 1000,
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前，添加身份验证令牌（如果存在）
    let userinfo = userStore()
    let token = userinfo.userInfo.token
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
      // console.log(token)
    }

    return config
  },
  (error) => {
    // 对请求错误进行处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在接收到响应数据之前可以进行一些处理，例如解析响应数据、错误处理等
    // ...这里根据实际项目进行更改
    return response;
  },
  (error) => {
    // 统一处理错误
    // 如果响应码是401，说明token失效，跳转到登录页面
    if (error.response && error.response.status === 401) {
      router.push('/');
    }
    console.error("响应错误", error)
    return Promise.reject(error)
  }
);


export default service
