<template>
  <el-form style="overflow: hidden; margin: 20px;" ref="queryForm" label-width="70px" label-position="right">
    <el-row>
      <el-col :span="1" style="min-height: 1px;"></el-col>
      <el-col :span="7" :offset="2">
        <el-form-item label="开始日期">
          <el-col :span="6">
            <el-date-picker v-model="startDate" type="date" placeholder="Pick a date" clearable />
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6" style="display: flex; ">
        <div>
          <el-button type="primary" @click="create" @mousedown="e => e.preventDefault()">增加</el-button>
          <el-button type="primary" @click.native="getdata()" @mousedown="e => e.preventDefault()">查询</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
  <el-table :data="fetchData1" style="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="title" label="采购项目" width="100">
      <template #default="scope">
        <el-input v-if="activeIndex === scope.$index" v-model="scope.row.title"></el-input>
        <span v-else>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="shuliang" label="数量" width="100">
      <template #default="scope">
        <el-input v-if="activeIndex === scope.$index" v-model="scope.row.shuliang"></el-input>
        <span v-else>{{ scope.row.shuliang }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="danjia" label="单价" width="100">
      <template #default="scope">
        <el-input v-if="activeIndex === scope.$index" v-model="scope.row.danjia"></el-input>
        <span v-else>{{ scope.row.danjia }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="hanshuijine" label="含税采购金额" width="120">
      <template #default="scope">
        <el-input v-if="activeIndex === scope.$index" v-model="scope.row.hanshuijine"></el-input>
        <span v-else>{{ scope.row.hanshuijine}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="shuie" label="进项税额" width="100">
      <template #default="scope">
        <el-input v-if="activeIndex === scope.$index" v-model="scope.row.shuie"></el-input>
        <span v-else>{{ scope.row.shuie }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220">
      <template #default="scope">
        <div v-if="activeIndex == scope.$index">
          <el-button type="info" @click="updatedData(scope.row)">保存</el-button>
        </div>
        <div v-else>
          <el-button type="success" @click="handleEditClick(scope.$index)">编辑</el-button>
          <el-popconfirm @confirm="handleDelete(scope.row)" width="220" confirm-button-text="OK"
            cancel-button-text="No, Thanks" :icon="InfoFilled" icon-color="#626AEF"
            title="Are you sure to delete this?">

            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>

    </el-table-column>
  </el-table>

  <addcaigou :isShow="isShowDialog" @closeDialog="closeDialog">

  </addcaigou>

</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { startOfWeek, addDays } from 'date-fns';
import axios from 'axios';
import { InfoFilled } from '@element-plus/icons-vue'
import addcaigou from '@/layout/components/zhousibaobiao/addcaigou.vue'
import service from '@/utils/interceptors';
// 计算当前周四的日期
const startDate = ref('');//日期
const getThisWeekThursday = () => {
  const now = new Date()
  const start = startOfWeek(now)
  return addDays(start, 4)
};
startDate.value = getThisWeekThursday();// 设置默认显示的日期

// 弹出窗口
const isShowDialog = ref(false)
const create = () => {
  isShowDialog.value = true
}
const closeDialog = () => {
  isShowDialog.value = false
  getdata()
}

const fetchData = ref([])
const fetchData1 = computed(() => {
      return [...fetchData.value].sort((a, b) => b.id - a.id);
    });
// 获取数据
// const url = 'http://localhost:3000/caigou'
const url = '/zsbb/caigou'
const getdata = async () => {
  try {
    // const response = await axios.get(url + "?date=" + startDate.value.toLocaleDateString())
    const response = await service.get(url + "?date=" + startDate.value.toLocaleDateString())
    fetchData.value = response.data
  } catch (error) {
    console.error('获取数据出错', error)
  }
}

// 打开页面立即查询
onMounted(() => {
  getdata()
});

// 监听日期变化
watch(startDate, (newQuery) => {
  getdata()
});


// 编辑行数据
let activeIndex = ref(-1);

const handleEditClick = (index) => {
  activeIndex.value = index
}


// PUT请求 - 保存修改数据
async function updatedData(data) {
  try {
    const response = await service.put(`${url}/${data.id}`, data);
    activeIndex.value = -1;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

// DELETE请求 - 删除数据
async function handleDelete(postId) {
  try {
    await service.delete(`${url}/${postId.id}`);
    getdata()
    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}

</script>