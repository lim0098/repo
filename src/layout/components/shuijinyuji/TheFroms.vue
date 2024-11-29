<template>
  <el-form :inline="true" class="demo-form-inline"
    label-position="right"      
    style="max-width: 90vh"
    label-width="150px"
  >
  <el-form-item label="开始日期">
    <el-col :span="6">
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </el-col>
  </el-form-item>
    <el-form-item label="截止日期">
      <el-col :span="6">
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="Pick a date"
          clearable
        />
      </el-col>                               
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="childhondlclick">查询</el-button>
    </el-form-item>
          
  </el-form>    
  <el-form class="demo-form-inline"
    label-position="right"
    style="max-width: 90vh"
    label-width="150px"
  >
    <el-form-item label="进项金额" >
      <el-col :span="6">
        <el-input v-model="total"/>
      </el-col>
    </el-form-item>
    <el-form-item label="预计进项金额" >
      <el-col :span="6">
        <el-input v-model="total1" />
      </el-col>
    </el-form-item>
    <el-form-item label="销项金额">
      <el-col :span="6">
        <el-input v-model="total2" />
      </el-col>
    </el-form-item>
    <el-form-item label="暂估销项金额">
      <el-col :span="6">
      <el-input v-model="total3" />
      </el-col>
    </el-form-item>
  </el-form>

</template>
<script lang="ts" setup>
import { ref } from 'vue';

const total = defineModel('total')
const total1 = defineModel('total1')
const total2 = defineModel('total2')
const total3 = defineModel('total3')
const startDate = defineModel('startDate')
const endDate = defineModel('endDate')
const emit = defineEmits(['hondlclick'])

const childhondlclick=()=>{
  emit('hondlclick')
}
</script>