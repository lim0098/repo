<template>
    <div>
      <el-button type="primary" v-hasPermi="['system:user:create']">创建</el-button>
     <el-button type="primary" v-hasPermi="['system:user:update']">更新</el-button>
     <el-button type="primary" v-hasPermi="['system:user:delete']">删除</el-button>
     <el-button type="primary" v-hasPermi="['system:user:admin']">没权限</el-button>

    </div>
  </template>