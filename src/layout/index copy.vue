<!-- <template>
    <div class="app-wrapper">
    <topsidebar></topsidebar>
      <Sidebar class="sidebar-container" />
      <App-Main class="main-container" />
    </div>
  </template> -->
  <template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <topsidebar></topsidebar>
        </el-header>
        
        <el-container>
          <el-aside width="200px">
        
        <Sidebar class="sidebar-container" />
        </el-aside>
          <el-main>
            <App-Main class="main-container" />
          </el-main>

          
      
        </el-container>
      </el-container>
    </div>
  </template>
  <script setup lang='ts'>
  import { ref, reactive } from 'vue'
  import Sidebar from './components/Sidebar.vue'
  import AppMain from './components/AppMain.vue'
  import topsidebar from './components/topsidebar.vue'
  </script>
  
  <style scoped>
  /* .app-wrapper {
      display: flex;
  } */
  /* .sidebar-container {
      width: 200px;
      height: 97vh;
      background-color: #545c64; */
      /* color: #545c64; */
  /* } */
  /* .main-container {
      flex: 1;
      height: 97vh;
      background-color: #f0f2f5;
  } */
  </style>