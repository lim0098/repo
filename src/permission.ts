// permission.ts
import router from './router'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { formatRoutes} from './utils/router'
import { useAuthStore } from '@/store/index';
import { userStore } from '@/store/user';
import { type App } from 'vue';
import { storeToRefs } from 'pinia';


// 路由加载前
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // 检查用户是否认证，例如检查是否有token
    const userState=userStore()
    // const taoken=localStorage.getItem("token")
    const taoken=userState.userInfo.token
    if (taoken!=null) {
      const userUrl:any=userState.userInfo.userUrl
      // if (userUrl.some(to.name)){
      if (userUrl.includes(to.name)){
        // console.log(321)
        next();  // 允许访问
      }else {
        next("/"); // 重定向到登录页面
      }
      // next();
    } else {
      next("/"); // 重定向到登录页面
    }
    // next();
  } else {
    next(); // 不需要权限校验的情况下直接通行
  }
})

// 路由跳转之后调用
router.afterEach((to) => { })


// 路由权限



/* 按钮权限 */
export function hasPermi(app: App<Element>) {
  app.directive('hasPermi', (el, binding) => {
    const { permissions } = useAuthStore()
    console.log(permissions,"123")
    const { value } = binding
    const all_permission = '*:*:*'

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission: string) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('权限不存在')
    }
  })
}

export function checkPermi(value: string[]) {
  const { permissions } = useAuthStore()
  const all_permission = '*:*:*'

  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value

    const hasPermissions = permissions.some((permission: string) => {
      return all_permission === permission || permissionFlag.includes(permission)
    })

    if (!hasPermissions) {
      return false
    }
    return true
  }
}
export function checkUrlPermi(value: string[]) {
  const  permissions1 = userStore()
  const  permissions:any = permissions1.userInfo.userUrl
  if (permissions!=null){
    const all_permission = '*'

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission: string) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        return false
      }
      return true
    }
    // return true
  }
}
  
export const setupAuth = (app: App<Element>) => {
  hasPermi(app)
}