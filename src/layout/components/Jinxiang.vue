<template>
  <!-- <vue-excel-editor v-model="tabledatavalue" >
      <vue-excel-column field="id"   label="User ID"       type="string" width="150px" />
      <vue-excel-column field="user"   label="User ID"       type="string" width="150px" />
      <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
      <vue-excel-column field="phone"  label="Contact"       type="string" width="150px" />
      <vue-excel-column field="gender" label="Gender"        type="select" width="150px" :options="['F','M','U']" />
      <vue-excel-column field="maney"    label="maney"           type="number" width="150px" />
      <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="150px" />
  </vue-excel-editor>  -->
  <el-table :data="tabledatavalue" style="width: 100%" border="true">
        <el-table-column prop="id" label="ID" type="string" width="50px" />
        <el-table-column prop="user" label="UserID" type="string" width="150px" />
        <el-table-column prop="name" label="Name" type="string" width="180px" />
        <el-table-column prop="phone" label="Contact" type="string" width="180px" />
        <el-table-column prop="gender" label="Gender"  type="select" width="100px" :options="['F','M','U']" />
        <el-table-column prop="maney" label="maney" type="number" width="150px" />
        <el-table-column prop="birth" label="DateOfBirth" type="date" width="150px" />
    </el-table>
</template>
<script lang="ts" setup>
  //声明接受props
  const tabledatavalue = defineModel('tabledatavalue')
</script>