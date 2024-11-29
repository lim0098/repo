import { defineStore } from 'pinia'
 
// 创建一个Pinia存储
export const useMenuStore = defineStore("menu",{
  state: () => ({
    menu: [],
  }),
  actions: {
    setMenu(menu: []) {
      this.menu = menu
    },
    removeMenu() {
      this.menu = []
    },
  },
})
 
// 在登录操作后设置menu
// function afterLogin(menu: null) {
//   const menuStore = useMenuStore()
//   menuStore.setMenu(menu)
// }
 
// 示例：登录成功后保存token
// 假设loginAPI是一个返回Promise的登录函数
// loginAPI().then(response => {
  // const token = response.data.token
  // afterLogin(token)
// })