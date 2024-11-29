import Layout from '@/layout/index.vue';
import router from '@/router';
import type { RouteRecordRaw } from 'vue-router'

//  获取所有子路由
const getChildrenRouters=(routes:RouteRecordRaw[])=>{
const childrenRoutes:RouteRecordRaw[]=[]
routes.forEach(route=>{
  if(route.children && route.children.length>0){
    childrenRoutes.push(...route.children)
  }
})
return childrenRoutes
}

// 处理重复路由
export const filterRoutes=(routes:RouteRecordRaw[])=>{
  // console.log('u1')
  const childrenRoutes=getChildrenRouters(routes)
  return routes.filter(route=>{
    return !childrenRoutes.find(childrenRoute=>{
      return childrenRoute.path===route.path
    })
  })
}

/* 处理从后端传过来的路由数据 */
export const formatRoutes = (routes: any[]) => {
  const formatedRoutes: RouteRecordRaw[] = []
  routes.forEach(route => {
      formatedRoutes.push(
        {
          ...route,
          component: Layout, // 主要是将这个 null -> 组件
          children: route.children.map((child: any) => {
            return {
              ...child,
              component: () => import(`@/views/${child.component}.vue`), // 根据 本地路径配置页面路径
            }
          }),
        }
      )
  })
  return formatedRoutes;
}


