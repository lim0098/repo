<template>
  <vue-excel-editor v-model="model" >
      <vue-excel-column field="user"   label="User ID"       type="string" width="150px" />
      <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
      <vue-excel-column field="phone"  label="Contact"       type="string" width="150px" />
      <vue-excel-column field="gender" label="Gender"        type="select" width="150px" :options="['F','M','U']" />
      <vue-excel-column field="maney"    label="maney"           type="number" width="150px" />
      <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="150px" />
  </vue-excel-editor> 
</template>
<script lang="ts" setup>
  //声明接受props
  const model = defineModel()
</script>