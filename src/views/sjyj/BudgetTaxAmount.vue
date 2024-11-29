<template>
    <div class="header">
        <TheFroms v-model:total3="total3"
            v-model:total="total"
            v-model:total1="total1"
            v-model:total2="total2"
            v-model:startDate="startDate"
            v-model:endDate="endDate"
            @hondlclick="hondlclick"
        >
        </TheFroms>

    </div>
    <div class="content">
        <el-tabs v-model="activeTab" >
            <el-tab-pane label="进项" name="first">
                <TheTables v-model:tabledatavalue="filteredData"/>
            </el-tab-pane>
            <el-tab-pane label="预计进项" name="second">
                <TheTables v-model:tabledatavalue="filteredData1"/>
            </el-tab-pane>
            <el-tab-pane label="销项" name="third">
                <TheTables v-model:tabledatavalue="filteredData2"/>
            </el-tab-pane>
            <el-tab-pane label="暂估销项" name="fourth">
                <TheTables v-model:tabledatavalue="filteredData3"/>
            </el-tab-pane>
        </el-tabs>
    </div> 
</template>

<script setup lang="ts">
import TheTables from '@/layout/components/shuijinyuji/TheTables.vue';
import  TheFroms from '@/layout/components/shuijinyuji/TheFroms.vue'
import { ref, reactive ,computed, onMounted} from 'vue';
import axios from 'axios';

const activeTab=ref("first")
const startDate = ref(new Date());

onMounted(() => {
    const now = new Date();
    startDate.value = new Date(`${now.getFullYear()}-${now.getMonth() }-1`);
});

const endDate = ref(new Date());
const url='http://localhost:3000/data'
const url1='http://localhost:3000/data1'
const url2='http://localhost:3000/data2'
const url3='http://localhost:3000/data3'
const tableData=ref([]);

const fetchData = async () => {
    try {
    const response = await axios.get(url, {
        params: {
        star: startDate.value,
        end: endDate.value
        }
    });
    tableData.value = response.data;
    console.log(response.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
}

const tableData1=ref([]);

const fetchData1 = async () => {
    try {
    const response = await axios.get(url1, {
        params: {
        star: startDate.value,
        end: endDate.value
        }
    });
    tableData1.value = response.data;
    console.log(response.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

const tableData2=ref([]);

const fetchData2 = async () => {
    try {
    const response = await axios.get(url2, {
        params: {
        star: startDate.value,
        end: endDate.value
        }
    });
    tableData2.value = response.data;
    console.log(response.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

const tableData3=ref([]);

const fetchData3 = async () => {
    try {
    const response = await axios.get(url3, {
        params: {
        star: startDate.value,
        end: endDate.value,
        // user:"hc"
        }
    });
    tableData3.value = response.data;
    console.log(response.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

const total = computed(() => {
    return filteredData.value.reduce((sum:number, item:any) => sum + item.maney, 0);
});

const total1 = computed(() => {
    return filteredData1.value.reduce((sum:number, item:any) => sum + item.maney, 0);
});

const total2 = computed(() => {
    return filteredData2.value.reduce((sum:number, item:any) => sum + item.maney, 0);
});

const total3 = computed(() => {
    return filteredData3.value.reduce((sum:number, item:any) => sum + item.maney, 0);
});

const filteredData = computed(() => {
    return tableData.value.filter((item: any) => {
        const date = new Date(item.birth);
        return date >= startDate.value && date <= endDate.value;
    });
});

const filteredData1 = computed(() => {
    return tableData1.value.filter((item: any) => {
        const date = new Date(item.birth);
        return date >= startDate.value && date <= endDate.value;
    });
});

const filteredData2 = computed(() => {
    return tableData2.value.filter((item: any) => {
        const date = new Date(item.birth);
        return date >= startDate.value && date <= endDate.value;
    });
});

const filteredData3 = computed(() => {
    return tableData3.value.filter((item: any) => {
        const date = new Date(item.birth);
        return date >= startDate.value && date <= endDate.value;
    });
});

let hondlclick=()=>{
    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
}
</script>

<style>
/* .comps{
    height: 350px;
} */
.header,.content{
  width: 95%;
  padding: 3px;
  margin: 3px;
  /* max-width: 100vh; */
  /* max-height: 350px; */
   /* margin-bottom: 15px; 边界高度 */
  /* background-color: #90ecac; 背景色 */
  border: 1px solid #9a9ed6; /* 边框 */
}
</style>