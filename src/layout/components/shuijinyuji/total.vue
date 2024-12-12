<template>
  <el-form :inline="true" class="demo-form-inline" label-position="right" style="max-width: 90vh" label-width="150px">
    <el-form-item label="查询期间">
      <el-col :span="6">
        <el-date-picker v-model="startDate" type="month" placeholder="Pick a date" clearable />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="childhondlclick">查询</el-button>
    </el-form-item>
  </el-form>
  <el-form class="demo-form-inline" label-position="right" style="max-width: 90%" label-width="150px">
    <el-row>
      <el-form-item label="进项金额">
        <el-col :span="22">
          <el-input v-model="shuiStore.jinxiiangshuie" />
        </el-col>
      </el-form-item>
      <el-form-item label="预计进项金额">
        <el-col :span="22">
          <el-input v-model="shuiStore.yujijinxiang" />
        </el-col>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="销项金额">
        <el-col :span="22">
          <el-input v-model="shuiStore.xiaoxiangshuie" />
        </el-col>
      </el-form-item>
      <el-form-item label="暂估销项金额">
        <el-col :span="22">
          <el-input v-model="shuiStore.zanguxiaoxiang" />
        </el-col>
      </el-form-item>
    </el-row>
  </el-form>

</template>
<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { startOfWeek, addDays } from 'date-fns';
import { useshuiStore } from '@/store/shui'

const shuiStore = useshuiStore()
// 计算当前周四的日期
const startDate = ref();//日期
const getThisWeekThursday = () => {
  const now = new Date()
  const start = startOfWeek(now)
  // return addDays(start, 4)
  // return new Date(now.getFullYear(), now.getMonth(), 1);
  startDate.value= new Date(now.getFullYear(), now.getMonth(), 1);
  shuiStore.starDate = startDate.value.toLocaleDateString()
};

// startDate.value = getThisWeekThursday();// 设置默认显示的日期
// 日期存入pinia
onMounted(()=>{
  getThisWeekThursday()
  console.log(shuiStore.starDate)
})


// 接收兄弟组件的方法
const emits = defineEmits(['jinxiangUse', 'xiaoxiangUse'])
const childhondlclick = () => {
  shuiStore.starDate = startDate.value.toLocaleDateString()
  // console.log(shuiStore.starDate)
  emits('jinxiangUse')
  emits('xiaoxiangUse')
}
</script>