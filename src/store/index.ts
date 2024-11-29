import { defineStore } from "pinia";
 
 interface AuthStore {
   // 菜单
   menus: any[];
   permissions:any[];
   user:any[];
   role:any[];
   token:'';
 }
 
 export const useAuthStore = defineStore("authState", {
   state: (): AuthStore => ({
    token:'',
    role:[
      {
        id:1,
        name:'admin',
        AllowWebsiteAddresses:[
          '用户管理',
          '系统管理',
          '菜单管理',
          '数据管理',
          '税金'
        ]
      },
      {
        id:2,
        name:'avisitor',
        AllowWebsiteAddresses:[
          '数据管理',
          '税金'
        ]
      },
      {
        id:3,
        name:'editor',
        AllowWebsiteAddresses:[
          '用户管理',
          '系统管理',
          '菜单管理'
        ]
      }

    ],
    user:[
      {
        id:1,
        name:'admin',
        password:'123456',
        roles:[
          {
            id:1,
            title:'admin'
          }
        ],
        Permissions:[
          '*:*:*'
        ]
      },
      {
        id:2,
        name:'ces1',
        password:'123456',
        roles:[
          {
            id:2,
            title:'avisitor'
          }
        ],
        Permissions:[
          'system:user:get'
        ]
      },
      {
        id:3,
        name:'ces2',
        password:'123456',
        roles:[
          {
            id:2,
            title:'editor'
          }
        ],
        Permissions:[
          'system:user:*'
        ]
      },

    ],
     menus: [
       {
         path: "/routing",
         component: null,
         redirect: "user",
         children: [
           {
             path: "/routing/user",
             component: "user",
             name: "用户管理",
             meta: {},
           },
           {
             path: "/routing/menu",
             component: "menu",
             name: "菜单管理",
             meta: {},
           }          
         ],
         name: "系统管理",
         meta: undefined,
       },
       {
         path: "/data",
         component: null,
         redirect: "data",
         children: [
           {
             path: "/data/tax",
             component: "BudgetTaxAmount",
             name: "税金",
             meta: {},
           }
         ],
         name: "数据管理",
         meta: undefined,
       }
     ],
     permissions: [
      // '*:*:*', // 所有权限
      'system:user:create',
      'system:user:update',
      'system:user:delete',
      'system:user:get',
      // 'system:user:admin'
      // 'system:tabs:first'
    ],
    // return: {
    //   token:''
    // }
   }),
   getters: {},
   actions: {},

 });
