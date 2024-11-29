// stores/auth.js
import { defineStore } from 'pinia'
 
export const userStore = defineStore({
  id: 'user',
  state: () => ({
    isLoggedIn: false,
    userInfo:{
      token:null,
      userUrl:null,
      userPermissions:null
    } 
  }),
  persist: true,
  actions: {
    loginUserStore(userInfo: { token: null; userUrl: null; userPermissions: null }) {
      this.isLoggedIn = true
      this.userInfo.token = userInfo.token
      this.userInfo.userUrl = userInfo.userUrl
      this.userInfo.userPermissions = userInfo.userPermissions
    },
    logout() {
      this.isLoggedIn = false
      this.userInfo.token = null
      this.userInfo.userUrl = null
      this.userInfo.userPermissions = null
    }
  

  }
})