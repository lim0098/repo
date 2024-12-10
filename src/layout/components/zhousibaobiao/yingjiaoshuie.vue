<template>
  <el-form :inline="true" class="demo-form-inline" label-position="right"  label-width="150px">
    <el-form-item label="开始日期">
      <el-col :span="6">
        <el-date-picker v-model="startDate" type="date" placeholder="Pick a date" clearable />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="childhondlclick">查询</el-button>
    </el-form-item>

  </el-form>
  <el-form class="demo-form-inline" label-position="right"  label-width="100px">
    <el-row>
    <el-form-item label="进项金额合计">
      <el-col :span="16">
        <el-input v-model="zsbbStore.jinxiiangshuie" disabled/>
      </el-col>
    </el-form-item>
    <el-form-item label="销项金额合计">
      <el-col :span="16">
        <el-input v-model="zsbbStore.xiaoxiangshuie" disabled/>
      </el-col>
    </el-form-item>
    <el-form-item label="应交税额">
      <el-col :span="16">
        <el-input v-model="zsbbStore.yinjiaoshuijin" disabled/>
      </el-col>
    </el-form-item>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { startOfWeek, addDays } from 'date-fns';
import { usezsbbStore } from '@/store/zsbbdata'

// 计算当前周四的日期
const startDate = ref();//日期
const getThisWeekThursday = () => {
  const now = new Date()
  const start = startOfWeek(now)
  return addDays(start, 4)
};
startDate.value = getThisWeekThursday();// 设置默认显示的日期

// 日期存入pinia
const zsbbStore = usezsbbStore()
zsbbStore.starDate = startDate.value.toLocaleDateString()

// 接收兄弟组件的方法
const emits = defineEmits(['caigouUse', 'xiaoshouUse'])

const childhondlclick = () => {
  zsbbStore.starDate = startDate.value.toLocaleDateString()
  emits('caigouUse')
  emits('xiaoshouUse')
  // emits('a4Use')
}

</script>