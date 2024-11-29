<template>
    <el-scrollbar>
        <el-table :data="tableData">
            <el-table-column prop="id" label="id" width="140" />
            <el-table-column prop="title" label="title" width="120" />
            <el-table-column prop="detail" label="detail" />
        </el-table>
      
    </el-scrollbar>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const item = {
    id: '1',
    title: 'Tom',
    detail: 'No. 189, Grove St, Los Angeles',
  }
  const tableData = ref(Array.from({ length: 15 }).fill(item))
  
  </script>