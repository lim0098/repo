<template>
  <div class="header">
    <total @jinxiangUse='usejinxiangMethod' @xiaoxiangUse='usexiaoxiangMethod'>
    </total>
  </div>
  <div class="content">
    <el-tabs v-model="activeName">

      <!-- 采购标签 -->
      <el-tab-pane label="进项明细" name="tabname1">
        <div class="scroll-container">
          <jinxiang ref='jinxiangRef'></jinxiang>
        </div>
      </el-tab-pane>

      <!-- 销售标签 style="max-width: 100vh"-->
      <el-tab-pane label="销项明细" name="tabname2">
        <div class="scroll-container">
          <xiaoxiang ref='xiaoxiangRef'></xiaoxiang>
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
import jinxiang from '@/layout/components/shuijinyuji/jinxiang.vue';
import xiaoxiang from '@/layout/components/shuijinyuji/xiaoxiang.vue';
import total from '@/layout/components/shuijinyuji/total.vue';
/* ------------------------ 变量 与 数据 ----------------------------------- */
const activeName = ref('tabname1')//默认显示的标签页

// jinxiang组件的方法
const jinxiangRef = ref()
const usejinxiangMethod = () => {
  jinxiangRef.value.getdata()
}

// xiaoxiangR组件的方法
const xiaoxiangRef = ref()
const usexiaoxiangMethod = () => {
  xiaoxiangRef.value.getdata()
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