<template>
  <div class="toolbar">
    <el-dropdown>
      <el-icon :size="25" style="margin-right: 8px; margin-top: 1px">
        <setting />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span><button @click="logout">退出登录</button></span>
  </div>
</template>
<script lang="ts" setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { userStore } from '@/store/user';

const router = useRouter();
const store = userStore();

const logout = () => {
  try {
    // 清除认证状态，例如清除token
    store.logout();
    localStorage.clear()
    // console.log(store.userInfo.userUrl,'退出')
    // 重定向到登录页面
    router.push('/');
  } catch (error) {
    // 处理错误，例如显示通知
    console.error('Logout error:', error);
  }
};
// const logout = async () => {
//   try {
//     // 清除认证状态，例如清除token
//     await store.logout();
//     localStorage.clear()
//     console.log(store)
//     // 重定向到登录页面
//     router.push('/');
//   } catch (error) {
//     // 处理错误，例如显示通知
//     console.error('Logout error:', error);
//   }
// };
</script>