<template>
  <el-form :inline="true" class="demo-form-inline" label-position="right" style="max-width: 90vh" label-width="150px">
    <el-form-item label="开始日期">
      <el-col :span="6">
        <el-date-picker v-model="startDate" type="date" placeholder="Pick a date" clearable />
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
import { ref } from 'vue';
import { startOfWeek, addDays } from 'date-fns';
import { useshuiStore } from '@/store/shui'

// 计算当前周四的日期
const startDate = ref();//日期
const getThisWeekThursday = () => {
  const now = new Date()
  const start = startOfWeek(now)
  return addDays(start, 4)
};
startDate.value = getThisWeekThursday();// 设置默认显示的日期

// 日期存入pinia
const shuiStore = useshuiStore()
shuiStore.starDate = startDate.value.toLocaleDateString()

// 接收兄弟组件的方法
const emits = defineEmits(['jinxiangUse', 'xiaoxiangUse'])

const childhondlclick = () => {
  shuiStore.starDate = startDate.value.toLocaleDateString()
  emits('jinxiangUse')
  emits('xiaoxiangUse')
  // emits('a4Use')
}
</script>