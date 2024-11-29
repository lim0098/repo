import {createRouter,createWebHistory} from 'vue-router'
import Layout from '@/layout/index.vue'  
import cesVue from '@/views/ces.vue'
import cescopyVue from '@/views/cescopy.vue'
import BudgetTaxAmountVue from '@/views/sjyj/BudgetTaxAmount.vue'
import homeVue from '@/views/home.vue'
import loginVue from '@/views/login/login.vue'
import menuVue from '@/views/menu/menu.vue'
import userVue from '@/views/user/user.vue'
import zsbb from '@/views/zsbb/zsbb.vue'

const router=createRouter({
  history:createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
  routes:[
    {
      path: '/',
      component: loginVue,
      // redirect: '/login',
      name: '登录',
      meta: undefined
    },
    {
      path: '/remaining',
      component: Layout,
      redirect: '/remaining/home',
      name: '主页管理',
      meta: {requiresAuth: false},
      children: [
        {
          path: '/remaining/home',
          component: homeVue,
          name: '首页',
          meta: {requiresAuth: false},
        },
        {
          path: '/remaining/cs',
          component: cesVue,
          name: '测试',
          meta: {requiresAuth: false},
        },
        {
          path: '/remaining/cs1',
          component: cescopyVue,
          name: '测试1',
          meta: {requiresAuth: false},
        }
      ]
    },
    {
      path: "/routing",
      component: Layout,
      name: "系统管理",
      meta: undefined,
      children: [
        {
          path: "/routing/user",
          component: userVue,
          name: "用户管理",
          meta: {requiresAuth: true},
        },
        {
          path: "/routing/menu",
          component: menuVue,
          name: "菜单管理",
          meta: {requiresAuth: true},
        }          
      ]
    },
    {
      path: "/data",
      component: Layout,
      name: "数据管理",
      meta: {requiresAuth: true},
      children: [
        {
          path: "/data/tax",
          component: BudgetTaxAmountVue,
          name: "税务管理",
          meta: {requiresAuth: true},
        },
        {
          path: "/data/zsbb",
          component: zsbb,
          name: "周四报表",
          meta: {requiresAuth: true},
        }
      ]
    }
  ]
})

export default router

// import type { App } from 'vue'
// import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'
// import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
