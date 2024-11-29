<template>
  <div>
    <el-tabs v-model="activeName">
    <!-- <el-tab-pane label="标签一" name="first">标签一</el-tab-pane> -->
    <el-tab-pane label="标签一" v-if="checkPermi(['system:tabs:first'])" name="first">标签一</el-tab-pane>
    <el-tab-pane label="标签二" name="second" >
      标签二
    </el-tab-pane>

  </el-tabs>
  </div>
</template>
<script setup lang='ts'>
/* ------------------------ 导入 与 引用 ----------------------------------- */
import { ref } from 'vue'
import { checkPermi } from '@/permission';
/* ------------------------ 变量 与 数据 ----------------------------------- */
const activeName = ref('second')
</script>