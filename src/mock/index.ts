// mock.js
import Mock from 'mockjs'
 
// 模拟登录接口数据
const loginAPI1 = {
  'action|1': ['success'],
  'message|5-10': 'cg',
  'data': {
    'token|10-20': 'random',
    "user": {
      "id": "1",
      "name": "admin",
      "password": "123456",
      "token":"123",
      "roles": [
        {
          "id": 1,
          "title": "admin"
        }
      ],
      "Permissions": [
        "*:*:*"
      ],
      "userUrl":[
        "*",
        "系统管理",  
        "用户管理",
        "菜单管理",
        "数据管理",                
        "税务管理",   
        "周四报表"      
      ]
    }
  }
}
const loginAPI2 = {
  'action|1': ['success'],
  'message|5-10': 'cg',
  'data': {
    'token|10-20': 'random',
    "user": {
      "id": "2",
      "name": "ces1",
      "password": "123456",
      "token":"234",
      "roles": [
        {
          "id": 2,
          "title": "avisitor"
        }
      ],
      "Permissions": [
        "system:user:get"
      ],
      "userUrl":[
        "数据管理", 
        "税务管理"                           
      ]
    }
  }
}
const loginAPI3 = {
  'action|1': ['success'],
  'message|5-10': 'cg',
  'data': {
    'token|10-20': 'random',
    "user": {
      "id": "3",
      "name": "ces2",
      "password": "123456",
      "token":"345",
      "roles": [
        {
          "id": 2,
          "title": "editor"
        }
      ],
      "Permissions": [
        "system:user:*"
      ],
      "userUrl":[               
        "数据管理",
        "周四报表"
      ]
    }
  }
}
const loginAPI4 = {
  'action|1': [ 'fail'],
  'message|5-10': 'shibai',
  'data': {
    'token|10-20': 'random'
  }
}
 
Mock.mock('/api/login', 'post', (options) => {
  // 解析POST请求体
  const params = JSON.parse(options.body)
  // 根据用户名和密码模拟登录成功或失败
  if (params.username === 'admin' && params.password === '123456') {
    return Mock.mock(loginAPI1) // 返回成功响应
  } else if (params.username === 'ces1' && params.password === '123456'){
    return Mock.mock(loginAPI2) // 返回成功响应
  }else if(params.username === 'ces2' && params.password === '123456'){
    return Mock.mock(loginAPI3) // 返回成功响应
  }else{
    return Mock.mock(loginAPI4) // 返回失败响应
  }
})