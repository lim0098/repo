<template>
  <a-table :columns="columns" :data-source="dataSource" bordered :pagination="pagination">
    <template #headerCell="record">
      <template v-if="record.column.dataIndex === 'operation'">
        <a-button size="small" type="primary" @click="create">增加</a-button>
      </template>
    </template>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['title', 'shuliang', 'danjia', 'hanshuijine', 'shuie'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
            style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">保存</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.id)">编辑</a>
            <a-popconfirm title="Sure to delete?" @confirm="handleDelete(record.id)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
    <a-pagination current="1" pageSize="6" show-less-items />
  </a-table>
  <addcaigou :isShow="isShowDialog" @closeDialog="closeDialog" @getdata="getdata">
  </addcaigou>
  <el-form-item label="开始日期">
      <el-col :span="6">
        <el-date-picker v-model="startDate" type="date" placeholder="Pick a date" clearable />
      </el-col>
    </el-form-item>
  <a-button size="small" type="primary" @click="getdata">查询</a-button>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref, computed } from 'vue';
import type { UnwrapRef } from 'vue';
import { usezsbbStore } from '@/store/zsbbdata'
import axios from 'axios';
import addcaigou from '@/layout/components/zhousibaobiao/addcaigou.vue'

// // 计算当前周四的日期
const startDate = ref();//日期
// const getThisWeekThursday = () => {
//   const now = new Date()
//   const start = startOfWeek(now)
//   return addDays(start, 4)
// };

// // 设置默认显示的日期
// startDate.value = getThisWeekThursday();

// 父组件中的日期
const zsbbStore = usezsbbStore()
const pagination= {
        // current: 1,
        pageSize: 6,
        // total: 0, // 总条数，由后端返回
        // showSizeChanger: true,
        // showQuickJumper: true,
        // showTotal: total => `总共 ${total} 条`,
      }
const columns = [
  {
    title: '项目',
    dataIndex: 'title',
    width: '15%',
  },
  {
    title: '数量',
    dataIndex: 'shuliang',
    width: '15%',
  },
  {
    title: '单价',
    dataIndex: 'danjia',
    width: '15%',
  },
  {
    title: '含税采购金额',
    dataIndex: 'hanshuijine',
    width: '15%',
  },
  {
    title: '进项税额',
    dataIndex: 'shuie',
    width: '15%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
interface DataItem {
  id: string;
  title: string;
  shuliang: string;
  danjia: string;
  hanshuijine: string;
  shuie: Number;
}

const fetchData = ref([])
const fetchData1 = computed(() => {
  return [...fetchData.value].sort((a, b) => b.id - a.id);
});

// 获取数据
// const url = 'http://localhost:3000/caigou'
const url = 'http://127.0.0.3:8080/zsbb/caigou'
const getdata = async () => {
  try {
    // startDate.value = zsbbStore.startDate
    const response = await axios.get(url + "?date=" + startDate.value.toLocaleDateString())
    fetchData.value = response.data
    console.log( response.data)
  } catch (error) {
    console.error('获取数据出错', error)
  }
}

const dataSource = ref(fetchData1);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// 编辑按钮
const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.id)[0]);
  console.log(editableData[key])
};

// 保存按钮
const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.id)[0], editableData[key]);
  delete editableData[key];
  updatedData(dataSource.value.filter(item => key === item.id)[0])
};

// PUT请求 - 保存修改数据
async function updatedData(data) {
  try {
    const response = await axios.put(`${url}/${data.id}`, data);
    // activeIndex.value = -1;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

const cancel = (key: string) => {
  delete editableData[key];
};

// 对税额求和
const total = computed(() => {
  return Math.round(fetchData.value.reduce((sum, item) => sum + Number(item.shuie), 0)*100)/100
})
zsbbStore.jinxiiangshuie=total

// DELETE请求 - 删除数据
async function handleDelete(postId) {
  try {
    await axios.delete(`${url}/${postId}`);
    getdata()
    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}

// 弹出窗口
const isShowDialog = ref(false)
const create = () => {
  isShowDialog.value = true
}
const closeDialog = () => {
  isShowDialog.value = false
  getdata()
}


// 将查询方法暴露给兄弟组件
defineExpose({
  getdata
})

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>