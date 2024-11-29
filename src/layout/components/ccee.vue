<template>
    <vue-excel-editor v-model="filteredData">
        <vue-excel-column field="id"   label="ID"       type="string" width="150px" />
        <vue-excel-column field="user"   label="User ID"       type="string" width="150px" />
        <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
        <vue-excel-column field="phone"  label="Contact"       type="string" width="150px" />
        <vue-excel-column field="gender" label="Gender"        type="select" width="150px" :options="['F','M','U']" />
        <vue-excel-column field="maney"    label="maney"           type="number" width="150px" />
        <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="150px" />
    </vue-excel-editor> 
    <el-table :data="filteredData" style="width: 100%">
        <el-table-column prop="id" label="ID" type="string" width="50px" />
        <el-table-column prop="user" label="User ID" type="string" width="150px" />
        <el-table-column prop="name" label="Name" type="string" width="180px" />
        <el-table-column prop="phone" label="Contact" type="string" width="180px" />
        <el-table-column prop="gender" label="Gender"  type="select" width="100px" :options="['F','M','U']" />
        <el-table-column prop="maney" label="maney" type="number" width="150px" />
        <el-table-column prop="birth" label="Date Of Birth" type="date" width="150px" />
    </el-table>
    <div>
        <el-form-item label="开始日期">
            <el-col :span="6">
                <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="Pick a date"
                    clearable
                    />
            </el-col>
        </el-form-item>
        <el-form-item label="截止日期">
            <el-col :span="6">
                <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="Pick a date"
                    clearable
                    />
            </el-col>
            <el-button type="primary" @click="hondlclick">查询</el-button>                        
        </el-form-item>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive ,computed, onMounted} from 'vue';
import axios from 'axios';

const startDate = ref(new Date());
onMounted(() => {
  const now = new Date();
  startDate.value = new Date(`${now.getFullYear()}-${now.getMonth() }-1`);
});
const endDate = ref(new Date());
const tableData=ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/data', {
            params: {
                star: startDate.value,
                end: endDate.value
            }
        });
        tableData.value = response.data;
        // total.value =  tableData.value.reduce((sum:number, item:any) => sum + item.maney, 0);
        console.log(response.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};
const total = computed(() => {
    return tableData.value.reduce((sum:number, item:any) => sum + item.maney, 0);
});
const filteredData = computed(() => {
    return tableData.value.filter((item: any) => {
        const date = new Date(item.birth);
        return date >= startDate.value && date <= endDate.value;
    });
});


let hondlclick=()=>{ 
    fetchData();
}

</script>