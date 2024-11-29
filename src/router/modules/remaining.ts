import Layout from '@/layout/index.vue'  
import login from '@/views/login.vue'
const remainingRouter: AppRouteRecordRaw[] = [
    {
      path: '/',
      component: login,
      // redirect: '/login',
      name: '登录',
      meta: undefined
    },
    {
      path: '/remaining',
      component: Layout,
      redirect: '/remaining/home',
      children: [
        {
          path: '/remaining/home',
          component: () => import('@/views/home.vue'),
          name: '首页',
          meta: {},
        },
        {
          path: '/remaining/cs',
          component: () => import('@/views/ces.vue'),
          name: '测试',
          meta: {},
        }
      ],
      name: '主页管理',
      meta: undefined
    },
  ]
  
  export default remainingRouter