<template>
  <div class="content" style="width: 96%;">

    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
        Reload
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${state.selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <input type="file" @change="handleExcel" />
    <a-button type="primary" @click="getdata()">查询</a-button>
    <a-button type="primary" @click="handleDelete(state.selectedRowKeys)">删除</a-button>
    <a-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :dataSource="fetchData" :pagination="pagination" rowKey="id">
      <template #headerCell="record">
      </template>
      <template #bodyCell="{ column, text, record }">
        <!-- <template v-if="['title'].includes(column.dataIndex)"></template> -->
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import * as XLSX from 'xlsx';
import service from '@/utils/interceptors';

const url = '/zsbb/jinxiangfapiao'

// 上传文件——————————————————
// 绑定到input的onChange事件，
// 从文件读取数据并处理成后端需要的格式————————
const data = ref([]);
const handleExcel = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data1 = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data1, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // 假设第一行是标题行，下面的数据是我们需要展示的
    data.value = json.slice(1).map(row => ({
      key: row[0], // 假设A列是唯一键
      title: row[2],
      kaipiaoriqi: row[5],
      jine: row[6],
      piaomianshuie: row[7],
      xiaoshoufangmingcheng: row[10],
    }));
    try {
      const response = await service.post(`${url}/`, data.value
      );
      console.log(response.data);
      getdata()
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsArrayBuffer(file);

}

// 获取发票数据_______
const fetchData = ref([])
const getdata = async () => {
  try {
    // startDate.value = zsbbStore.starDate
    // const response = await service.get(url + "?date=" + startDate.value)
    const response = await service.get(url + "/")
    fetchData.value = response.data
  } catch (error) {
    console.error('获取数据出错', error)
  }
}

// ——————分页————
const pagination = {
  // current: 1,
  pageSize: 6,
  // total: 0, // 总条数，由后端返回
  // showSizeChanger: true,
  // showQuickJumper: true,
  // showTotal: total => `总共 ${total} 条`,
}

// ————————————表格中的列名——————————
const columns = [
  {
    title: '数电票号码',
    dataIndex: 'title',
    width: '15%',
  },
  {
    title: '开票日期',
    dataIndex: 'kaipiaoriqi',
    width: '15%',
  },
  {
    title: '金额',
    dataIndex: 'jine',
    width: '15%',
  },
  {
    title: '票面税额',
    dataIndex: 'piaomianshuie',
    width: '15%',
  },
  {
    title: '销售方纳税人名称',
    dataIndex: 'xiaoshoufangmingcheng',
    width: '15%',
  },
];

// DELETE请求 - 删除数据
async function handleDelete(postId: any) {
  try {
    await service.delete(`${url}/multiple_delete/?ids=${postId}`);
    getdata()
    console.log('deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}
// 1.————————————表格中的选择框————————————————
// type Key = string | number;
const state = reactive<{
  selectedRowKeys: [];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const start = () => {
  state.loading = true;
  // ajax request after empty completing





  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};

const getSelectedIds = () => {
  // const sdata=data.value
  const selectedIds = state.selectedRowKeys.map(key => fetchData.value.find(item => key === item['id'])['id']);
  // const selectedIds = state.selectedRowKeys.map(key => data.value.filter(item => key === item['key'])[0]);
  // console.log(selectedIds);
};
const onSelectChange = (selectedRowKeys: []) => {
  // console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
  getSelectedIds();
};

</script>