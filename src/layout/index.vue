<template>
  <el-container class="layout-container-demo" style="max-height: 1000px">
    <el-header style="text-align: right; font-size: 12px">
      <topsidebar></topsidebar>
    </el-header>
    <el-container>
      <el-aside width="200px" >
      <el-scrollbar>
        <Sidebar></Sidebar>
      </el-scrollbar>
    </el-aside>
      <el-main style="height: 680px">
        <el-scrollbar>
          <AppMain></AppMain>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import Sidebar from '@/layout/components/sidelayout/Sidebar.vue'
import AppMain from '@/layout/components/sidelayout/AppMain.vue'
import topsidebar from '@/layout/components/sidelayout/topsidebar.vue'
</script>

<style scoped>
.el-aside {
  max-height: 680px;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>