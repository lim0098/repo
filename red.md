

https://worktile.com/kb/ask/531001.html

https://worktile.com/kb/p/3538826
安装 json-server

npm install -g json-server

创建模拟数据文件

在项目根目录下创建一个 db.json 文件，定义模拟数据：

{

  "users": [


    { "id": 1, "name": "John Doe", "email": "john@example.com" },


    { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }


  ]


}

启动 json-server

json-server --watch db.json


访问模拟接口

在 Vue 项目中通过 Axios 或 Fetch 访问 json-server 提供的接口：

import axios from 'axios';

axios.get('http://localhost:3000/users').then(response => {


  console.log(response.data);


});



背景信息：

json-server 可以快速生成一个完整的 REST API，并支持 GET、POST、PUT、DELETE 等常见的 HTTP 操作，适用于简单的模拟后端服务。