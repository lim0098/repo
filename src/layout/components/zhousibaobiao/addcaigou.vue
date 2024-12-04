<template>
    <el-dialog class="edit-dialog" title="编辑" width="40%" :center="true" ref="dialogRef" @close="handleClose"
      v-model="isShow">
      <el-form :model="form" label-width="auto" style="max-width: 500px">
        <el-row>
          <el-col :span="18">
            <el-form-item label="日期">
              <el-date-picker v-model="startDate" type="date" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="项目">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.shuliang" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.danjia" />
        </el-form-item>
        <el-form-item label="含税采购金额">
          <el-input v-model="form.hanshuijine" />
        </el-form-item>
        <el-form-item label="税额">
          <el-input v-model="shuie" disabled/>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12" :offset="8">
          <el-button @click="onSubmit()">保存</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import { startOfWeek, addDays } from 'date-fns';
  import axios from 'axios';
  import service from '@/utils/interceptors';
  
  // 计算当前周四的日期
  const startDate = ref();//日期
  const getThisWeekThursday = () => {
    const now = new Date()
    const start = startOfWeek(now);
    return addDays(start, 4);
  };
  
  // 设置默认显示的日期
  startDate.value = getThisWeekThursday();
  
  const isShow = defineModel('isShow')
  const emit = defineEmits(['closeDialog','getdata'])
  
  const closeDialog = () => {
    emit('closeDialog')
  }
  const handleClose = () => {
    emit('closeDialog')
  }
  
  const form = reactive({
    title: '',
    shuliang: '',
    danjia: '',
    hanshuijine: 0,
    // shuie: shuie.value,
  })
  
  // const url = 'http://localhost:3000/caigou'
  // const url = 'http://127.0.0.3:8080/zsbb/caigou/'
  const url = '/zsbb/caigou/'
  const onSubmit = async () => {
    try {
      const response = await service.post(url, {
        date: startDate.value.toLocaleDateString(),
        title: form.title,
        shuliang: form.shuliang,
        danjia: form.danjia,
        hanshuijine: form.hanshuijine,
        shuie: shuie.value,
      })
      emit('getdata')
      console.log('添加成功',response.data)
    } catch (error) {
      console.error('请求出错', error)
    }
  }
  
  // 计算税金
  // form.hanshuijine = computed(() => {
  //   return Math.round(form.shuliang * form.danjia * 100) / 100
  // })
  
  const shuie = computed(() => {
    return Math.round(form.hanshuijine / 1.13 * 0.13 * 100) / 100
  })
  
  
  </script>