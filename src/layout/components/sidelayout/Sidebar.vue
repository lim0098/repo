<template>
  <div>
    <!-- <el-menu :default-openeds="['/remaining']"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active=activeMenu
      text-color="#fff"
      router
    >
      <el-sub-menu :index="item.path" v-for="(item,index) in routers"  v-show="index >= 1" >
        <template #title>{{ item.name }}</template>
        <el-menu-item :index="child.path" v-for="(child,index) in item.children">
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu> -->
    <el-menu
      :default-openeds="['/remaining']"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="/remaining/home"
      text-color="#fff"
      :default-active=activeMenu
      router
    >
      <!-- @open="handleOpen"
        @close="handleClose" -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>主页管理</span>
          </template>          
          <el-menu-item index="/remaining/home" >首页</el-menu-item>
          <el-menu-item index="/remaining/cs" >测试</el-menu-item>
          <el-menu-item index="/remaining/cs1" >测试1</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2" v-if="checkUrlPermi(['系统管理'])">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </template>          
          <el-menu-item index="/routing/user" v-if="checkUrlPermi(['用户管理'])">用户管理</el-menu-item>
          <el-menu-item index="/routing/menu" v-if="checkUrlPermi(['菜单管理'])">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3" v-if="checkUrlPermi(['数据管理'])">
          <template #title>
            <el-icon><document /></el-icon>
            <span>数据管理</span>
          </template>          
          <el-menu-item index="/data/tax" v-if="checkUrlPermi(['税务管理'])">税金预计</el-menu-item>
          <el-menu-item index="/data/zsbb" v-if="checkUrlPermi(['周四报表'])">周四报表</el-menu-item>
        </el-sub-menu>
      </el-menu>
  </div>
</template>

<script setup lang='ts'>
// /* ------------------------ 导入 与 引用 ----------------------------------- */
import { checkUrlPermi } from '@/permission';
import { filterRoutes } from '@/utils/router';
import { computed, ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

// /* ------------------------ 变量 与 数据 ----------------------------------- */
const router = useRouter()
const activeMenu = ref('/remaining/home');
const activeName = ref('second')

// 通过计算属性，路由发生变化时更新路由信息
const routers = computed(() => {
  console.log(router.getRoutes(),'sidebar1')
  return filterRoutes(router.getRoutes()) // router.getRoutes() 用于获取路由信息
})




</script>
