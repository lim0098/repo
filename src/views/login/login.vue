<template>
  <div class="center">
  <el-form
    
    style="max-width: 600px"
    
    status-icon
    
    label-width="200px"
    class="demo-ruleForm"
  >
  <!-- ref="ruleFormRef" -->
  <!-- :model="loginForm" -->
    <!-- :rules="rules" -->
    <el-form-item label="用户名" prop="username">
      <el-col :span="12">
      <el-input v-model="username" type="text" autocomplete="off"/>
      </el-col>
    </el-form-item>
    <el-form-item label="密码" prop="password" >
      <el-col :span="12">
          <el-input v-model="password" type="password" autocomplete="off" />
      </el-col>
    </el-form-item>

    <div style="margin-left: 50px;">
    <el-form-item >
      <el-button type="primary" @click="login()">登录</el-button>
    </el-form-item>
    </div>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue';
import { userStore } from '@/store/user'
import router from '@/router';
import {formatRoutes} from '@/utils/router'

const userstate = userStore();
const username=ref ('ces1');
const  password=ref('1234567');
// const url='/api/login'
// const url='http://127.0.0.3:8080/users/login'
const baseurl=import.meta.env.VITE_AP_BASE_URL
const url='/users/login'
async function login() {
  try {
    const response = await axios.post(baseurl+url, {
      username: username.value,
      password: password.value
    })
    if (response.status=== 200) {
      // 登录成功的操作,将用户信息写入本地localStorage
      // console.log('登录成功', response.data.data.user)
      localStorage.setItem('userPermissions', JSON.stringify(response.data.p));
      localStorage.setItem('userUrl', JSON.stringify(response.data.m));
      localStorage.setItem('token', JSON.stringify(response.data.token));
      const userInfo={
        token:response.data.token,
        userUrl:response.data.m,
        userPermissions:response.data.p
      } 
      userstate.loginUserStore(userInfo)//将本地信息写入pinia
      router.push('/remaining/home')

      
    } else {
      // 登录失败的操作
      console.error('登录失败', response.data.message)
    }
  } catch (error) {
    console.error('登录请求出错', error)
  }
}






</script>
<style>
.center{
  width: 600px;
  /* 容器高度 */
  height: 200px; 
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #9a9ed6; /* 边框 */
  /* 背景色 */
  /* background-color: #90ecac;  */
  padding: 50px;
  /* width: 50%; or any other value */
}

</style>