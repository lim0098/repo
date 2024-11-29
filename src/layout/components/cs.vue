<template>
  <div>
    <el-upload
      class="upload-demo"
      :on-change="handleUpload"
      accept="xls,xlsx"
      :auto-upload="false"
      :multiple="true"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled/></el-icon>
      <div>将文件拖到此处或<em>点击上传</em></div>
    </el-upload>
    <hr/>
    <!-- <el-table :data="tableData" style="width: 100%" border="true">
      <el-table-column prop="id" label="ID" width="50px" />
      <el-table-column prop="user" label="UserID" width="150px" />
      <el-table-column prop="name" label="Name"  width="180px" />
      <el-table-column prop="phone" label="Contact"  width="180px" />
      <el-table-column prop="gender" label="Gender"   width="100px" :options="['F','M','U']" />
      <el-table-column prop="maney" label="maney" width="150px" />
      <el-table-column prop="birth" label="DateOfBirth"  width="150px" />
    </el-table> -->
    <vue-excel-editor v-model="tableData" >
      <vue-excel-column field="id"   label="ID"       type="string" width="150px" />
      <vue-excel-column field="user"   label="UserID"       type="string" width="150px" />
      <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
      <vue-excel-column field="phone"  label="Contact"       type="string" width="150px" />
      <vue-excel-column field="gender" label="Gender"        type="select" width="150px" :options="['F','M','U']" />
      <vue-excel-column field="maney"    label="maney"           type="number" width="150px" />
      <vue-excel-column field="birth"  label="DateOfBirth" type="date"   width="150px" />
  </vue-excel-editor> 
  </div>
  <el-form-item>
    <el-button type="primary" @click="sendDataToBackend">保存</el-button>
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import {UploadFilled} from '@element-plus/icons-vue';
import axios from 'axios';
const tableData=ref([]);

//读取excel文件
const readFile=(file: any)=>{
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.readAsArrayBuffer(file.raw);
    reader.onload=(e)=>{
      resolve(e.target?.result);
    }
    reader.onerror=(e)=>{
      reject(e);
    }
  })
}

const handleUpload=async(File: any)=>{
  const data=await getXlsxData(File);
  tableData.value=translateField(data);
}

//读取表格数据
const getXlsxData=async(file: any)=>{
  const dataBinary=await readFile(file);
  const workBook=XLSX.read(dataBinary);
  const workSheet=workBook.Sheets[workBook.SheetNames[0]];
  const data=XLSX.utils.sheet_to_json(workSheet);
  const newData=data.slice(0,data.length-1);
  return newData
}

//映射字段
const translateField=(data: any[])=>{
  const arr: []=[];
  const cnToEn: { [key: string]: any } ={
    ID:"id",
    UserID:"user",
    Name:"name",
    Contact:"phone",
    Gender:"gender",
    maney:"maney",
    DateOfBirth:"birth"





  }
  data.forEach((item)=>{
    const arrItem: { [key: string]: any } ={};
    Object.keys(item).forEach((key)=>{
      arrItem[cnToEn[key]]=item[key];
    })
    arr.push(arrItem as never);
  })
  return arr
}

// 发送数据到后端的函数
async function sendDataToBackend() {
  try {
    const response = await axios.post('http://localhost:3000/data', { data: tableData.value });
    console.log(response.data); // 后端响应的数据
  } catch (error) {
    console.error(error); // 错误处理
  }
}


  // const data = ref([
  //   { name: 'John Doe', email: 'john@example.com' },
  //   { name: 'Jane Doe', email: 'jane@example.com' }
  // ]);
   
  // function importExcel(event: { target: { files: any[]; }; }) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const firstSheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[firstSheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //     console.log(jsonData);
  //   };
  //   reader.readAsArrayBuffer(file);
  // }
   
  // function exportExcel() {
  //   const ws = XLSX.utils.json_to_sheet(data.value);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
  //   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  //   function s2ab(s: string) {
  //     const buf = new ArrayBuffer(s.length);
  //     const view = new Uint8Array(buf);
  //     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  //     return buf;
  //   }
    
  //   saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'data.xlsx');
  // }
  

</script>