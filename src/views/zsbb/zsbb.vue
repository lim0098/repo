<template>
  <div class="header">
    <yingjiaoshuie @caigouUse='usecaigouMethod' @xiaoshouUse='usexiaoshouMethod'>
    </yingjiaoshuie>
  </div>
  <div class="content">
    <el-tabs v-model="activeName">

      <!-- 采购标签 -->
      <el-tab-pane label="进项明细" name="tabname1">
        <div class="scroll-container">
          <caigou ref='caigouRef'></caigou>
        </div>
      </el-tab-pane>

      <!-- 销售标签 style="max-width: 100vh"-->
      <el-tab-pane label="销项明细" name="tabname2">
        <div class="scroll-container">
          <xiaoshou ref='xiaoshouRef'></xiaoshou>
        </div>
      </el-tab-pane>

      <!-- 其他标签 -->
      <el-tab-pane label="标签二" name="tabname3" v-if="checkPermi(['system:tabs:first'])">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang='ts'>
/* ------------------------ 导入 与 引用 ----------------------------------- */
import { ref, reactive, computed } from 'vue'
import { checkPermi } from '@/permission';
import xiaoshou from '@/layout/components/zhousibaobiao/xiaoshou.vue'
import caigou from '@/layout/components/zhousibaobiao/caigouA.vue'
import yingjiaoshuie from '@/layout/components/zhousibaobiao/yingjiaoshuie.vue'

/* ------------------------ 变量 与 数据 ----------------------------------- */
const activeName = ref('tabname1')//默认显示的标签页

// caigou组件的方法
const caigouRef = ref()
const usecaigouMethod = () => {
  caigouRef.value.getdata()
}

// xiaoshou组件的方法
const xiaoshouRef = ref()
const usexiaoshouMethod = () => {
  xiaoshouRef.value.getdata()
}
</script>

<style>
.scroll-container {
  height: 490px;
  overflow: auto;
  /* border: 1px solid #9a9ed6; */
  /* margin: 20px; */
}

.header,
.content {
  width: 96%;
  padding: 3px;
  margin: 5px;
  /* margin-left: 20px; */
  /* max-width: 100vh; */
  /* max-height: 350px; */
  /* margin-bottom: 15px; 边界高度 */
  /* background-color: #90ecac; 背景色 */
  border: 1px solid #9a9ed6;
  /* 边框 */

}
</style>