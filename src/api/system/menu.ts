import axios, { type AxiosRequestConfig } from 'axios';
import { useMenuStore } from '@/store/menu';
export default async function fetchData()  {
  try {
    const url="http://localhost:3000/menu"
    const response = await axios.get(url)
    const menustore=useMenuStore()
    menustore.setMenu(response.data)
    console.log('5');
    console.log(menustore.menu)
    // return response.data; // 返回数据
  } catch (error) {
  console.error('Error fetching data:', error);
  }
}
 
// 封装的发送请求函数
export async function getMenulist(url: any, options: AxiosRequestConfig<any>) {
  try {
    const token = localStorage.getItem('token'); // 获取Token
    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': `Bearer ${token}` // 设置Token到请求头
      },
      ...options // 其他Axios配置选项
    });
    return response.data; // 返回数据
  } catch (error) {
    console.error('Fetch error:', error); // 错误处理
    throw error; // 抛出错误
  }
}