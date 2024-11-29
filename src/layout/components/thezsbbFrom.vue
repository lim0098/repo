<template>
  <el-row :gutter="5">
    <el-col :span="4" :offset="2">
      <el-input v-model="title" placeholder="项目" />
    </el-col>
    <el-col :span="4">
      <el-input v-model="shuliang" placeholder="数量" />
    </el-col>
    <el-col :span="4">
      <el-input v-model="danjia" placeholder="单价" />
    </el-col>
    <el-col :span="4">
      <el-input v-model="hanshuijine" placeholder="销售金额含税" />
    </el-col>
    <el-col :span="4">
      <el-input v-model="shuie" disabled placeholder="销项税额" />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref,computed } from 'vue';

const title = defineModel('title')
const shuliang = defineModel('shuliang')
const danjia = defineModel('danjia')
const hanshuijine = computed(()=>{
  return Math.round(shuliang.value * danjia.value*100)/100
})
const shuie = computed(()=>{
  return Math.round(shuliang.value * danjia.value/1.13*0.13*100)/100
})

</script>