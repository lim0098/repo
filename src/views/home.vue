<template>
  <div>
    <el-tabs v-model="activeName">
    <!-- <el-tab-pane label="标签一" name="first">标签一</el-tab-pane> -->
    <el-tab-pane label="标签一" v-if="checkPermi(['system:tabs:first'])" name="first">标签一</el-tab-pane>
    <el-tab-pane label="进项" name="second" >
      <Jinxiang></Jinxiang>
    </el-tab-pane>
    <el-tab-pane label="销项" name="sd" >
      <Xiaoxiang></Xiaoxiang>
    </el-tab-pane>

  </el-tabs>
  </div>
</template>
<script setup lang='ts'>
/* ------------------------ 导入 与 引用 ----------------------------------- */
import { ref } from 'vue'
import { checkPermi } from '@/permission';
import Jinxiang from '@/layout/components/shuijinyuji/jinxiang.vue';
import Xiaoxiang from '@/layout/components/shuijinyuji/xiaoxiang.vue';
/* ------------------------ 变量 与 数据 ----------------------------------- */
const activeName = ref('second')
</script>